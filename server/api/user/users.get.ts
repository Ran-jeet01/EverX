import { db } from '../../utils/drizzle';
import { users } from '../../db/schemas/users';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // In a real app, we should check for admin role here
  // const { user } = await requireUserSession(event);
  // if (user.role !== 'admin') throw createError({ statusCode: 403 });

  try {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    // Remove password from response
    return allUsers.map(({ password, ...u }) => u);
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load users",
      message: err.message,
    });
  }
});
