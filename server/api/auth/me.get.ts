import { verifyToken } from '../../utils/auth';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    const payload = verifyToken(token);
    if (!payload) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        });
    }

    // (Optional) Fetch fresh user data from DB to ensure role/status is up to date
    const userResult = await db.select().from(users).where(eq(users.id, (payload as any).id)).limit(1);
    const user = userResult[0];

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'User not found',
        });
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
});
