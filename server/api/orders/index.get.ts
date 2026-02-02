import { defineEventHandler, createError } from 'h3';
import { db } from '../../utils/drizzle';
import { orders } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthenticated' });
    }

    const userOrders = await db.query.orders.findMany({
        where: eq(orders.userId, user.id),
        orderBy: [desc(orders.createdAt)],
        with: {
            items: {
                with: {
                    product: true
                }
            }
        }
    });

    return userOrders;
});
