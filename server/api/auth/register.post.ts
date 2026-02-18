import { users, pendingRegistrations } from "../../db/schema";
import { db } from "../../utils/drizzle";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import crypto from "crypto";
import { sendVerificationEmail } from "../../utils/mailer";

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
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  // Check if pending registration exists
  const existingPending = await db
    .select()
    .from(pendingRegistrations)
    .where(eq(pendingRegistrations.email, email))
    .limit(1);

  if (existingPending.length > 0) {
    // Update existing pending registration
    await db
      .update(pendingRegistrations)
      .set({
        password: hashedPassword,
        name,
        address,
        token,
        expiresAt,
        createdAt: new Date(),
      })
      .where(eq(pendingRegistrations.email, email));
  } else {
    // Create users
    await db
      .insert(pendingRegistrations)
      .values({
        email,
        password: hashedPassword,
        name,
        address,
        role: "user",
        token,
        expiresAt,
      });
  }

  // Send verification email
  const emailSent = await sendVerificationEmail(email, token);
  if (!emailSent) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send verification email",
    });
  }

  return {
    message: "Registration successful. Please check your email to verify your account.",
  };
});
