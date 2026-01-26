// import { users } from '~/server/db/schema';
// import { db } from '~/server/utils/drizzle';
import { db } from "../../utils/drizzle";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, name } = body;

  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await db
    .insert(users)
    .values({
      email,
      name,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
    });

  return newUser[0];
});
