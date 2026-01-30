import { defineEventHandler, getCookie, readBody, getQuery, createError } from 'h3';
import { db } from '../../utils/drizzle';
import { cartItems } from '../../db/schemas/cart';
import { eq, and } from 'drizzle-orm';
import { verifyToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Unauthenticated' });
    }

    const payload = verifyToken(token) as any;
    if (!payload || typeof payload === 'string' || !payload.id) {
        throw createError({ statusCode: 401, message: 'Invalid token' });
    }

    const userId = payload.id;
    const method = event.method;

    if (method === 'GET') {
        const items = await db.select().from(cartItems).where(eq(cartItems.userId, userId));
        return items;
    }

    if (method === 'POST') {
        const body = await readBody(event);
        const { productId, quantity } = body;

        // Check if item already exists
        const existingArgs = and(
            eq(cartItems.userId, userId),
            eq(cartItems.productId, productId)
        );
        const existing = await db.select().from(cartItems).where(existingArgs).limit(1);

        const firstExisting = existing[0];
        if (firstExisting) {
            // Update quantity
            const newQuantity = (firstExisting.quantity || 0) + (quantity || 1);
            const [updatedItem] = await db
                .update(cartItems)
                .set({ quantity: newQuantity })
                .where(eq(cartItems.id, firstExisting.id))
                .returning();
            return updatedItem;
        } else {
            const [newItem] = await db
                .insert(cartItems)
                .values({
                    userId,
                    productId,
                    quantity: quantity || 1,
                })
                .returning();
            return newItem;
        }
    }

    if (method === 'PUT') {
        const body = await readBody(event);
        const { id, quantity } = body;

        // Verify ownership
        const [firstItem] = await db.select().from(cartItems).where(eq(cartItems.id, id)).limit(1);
        if (!firstItem || firstItem.userId !== userId) {
            throw createError({ statusCode: 403, message: 'Forbidden' });
        }

        const [updated] = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id)).returning();
        return updated; // Return full updated object for consistency
    }

    if (method === 'DELETE') {
        const query = getQuery(event);
        const id = Number(query.id);

        // Verify ownership
        const [firstItem] = await db.select().from(cartItems).where(eq(cartItems.id, id)).limit(1);
        if (!firstItem || firstItem.userId !== userId) {
            // If item doesn't exist, we can just return success or 404, but ownership check is key.
            // If item not found, 404 is appropriate.
            if (!firstItem) throw createError({ statusCode: 404, message: 'Not found' });
            throw createError({ statusCode: 403, message: 'Forbidden' });
        }

        await db.delete(cartItems).where(eq(cartItems.id, id));
        return { success: true };
    }
});
