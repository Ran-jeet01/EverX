import { db } from '../../utils/drizzle';
import { users } from '../../db/schemas/users';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    // TODO: Add admin auth check
    const query = getQuery(event);
    const id = query.id as string;

    if (!id) {
        throw createError({ statusCode: 400, message: 'Missing id' });
    }

    try {
        await db.delete(users).where(eq(users.id, id));
        return { success: true };
    } catch (e) {
        throw createError({ statusCode: 500, message: 'Failed to delete user' });
    }
});
