import { defineEventHandler, createError, readBody } from 'h3';
import { db } from '../../../../utils/drizzle';
import { orders } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const statusSchema = z.object({
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
});

export default defineEventHandler(async (event) => {
    // context user check for admin role

    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: 'Missing ID' });

    const body = await readBody(event);
    const result = statusSchema.safeParse(body);

    if (!result.success) {
        throw createError({ statusCode: 400, message: 'Invalid status' });
    }

    const [updatedOrder] = await db
        .update(orders)
        .set({ status: result.data.status })
        .where(eq(orders.id, id))
        .returning();

    return updatedOrder;
});
