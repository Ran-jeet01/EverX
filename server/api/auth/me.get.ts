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

    const payload = verifyToken(token) as any;
    if (!payload || !payload.id) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        });
    }

    // Validate UUID format to prevent DB errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(payload.id)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid session format. Please log in again.',
        });
    }

    // (Optional) Fetch fresh user data from DB to ensure role/status is up to date
    const userResult = await db.select().from(users).where(eq(users.id, payload.id)).limit(1);
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
        address: user.address,
    };
});
