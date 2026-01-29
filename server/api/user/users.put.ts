import { db } from '../../utils/drizzle';
import { users } from '../../db/schemas/users';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    // TODO: Add admin auth check
    const body = await readBody(event);
    const { id, role } = body;

    if (!id || !role) {
        throw createError({ statusCode: 400, message: 'Missing id or role' });
    }

    try {
        const [updatedUser] = await db.update(users)
            .set({ role })
            .where(eq(users.id, id))
            .returning();

        const { password, ...safeUser } = updatedUser;
        return safeUser;
    } catch (e) {
        throw createError({ statusCode: 500, message: 'Failed to update user' });
    }
});
