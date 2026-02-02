import { users } from "../../db/schema";
import { db } from "../../utils/drizzle";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  address: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input",
      data: result.error.flatten(),
    });
  }

  const { email, password, name, address } = result.data;

  // Check if user exists
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
  // Role defaults to 'user' in schema, so we don't need to specify it unless we want to force it
  const newUser = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      name,
      address,
      role: "user", // Explicitly setting it as requested
    })
    .returning();

  const user = newUser[0];
  if (!user) {
    throw createError({
      statusCode: 500,
      message: "Failed to create user",
    });
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
});
