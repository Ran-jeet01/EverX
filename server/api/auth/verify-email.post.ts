import { users, pendingRegistrations } from "../../db/schema";
import { db } from "../../utils/drizzle";
import { eq } from "drizzle-orm";
import { z } from "zod";

const verifySchema = z.object({
    token: z.string(),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const result = verifySchema.safeParse(body);

    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input",
            data: result.error.flatten(),
        });
    }

    const { token } = result.data;

    // Find pending registration
    const pendingUser = await db
        .select()
        .from(pendingRegistrations)
        .where(eq(pendingRegistrations.token, token))
        .limit(1);

    if (pendingUser.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid or expired token",
        });
    }

    const user = pendingUser[0];

    // Check expiration
    if (new Date() > user.expiresAt) {
        throw createError({
            statusCode: 400,
            statusMessage: "Token has expired. Please register again.",
        });
    }

    try {
        await db.transaction(async (tx) => {
            // Check if email already exists in users table
            const existingUser = await tx
                .select()
                .from(users)
                .where(eq(users.email, user.email))
                .limit(1);

            if (existingUser.length > 0) {
                // User already verified, just delete pending record
                await tx
                    .delete(pendingRegistrations)
                    .where(eq(pendingRegistrations.id, user.id));
                return;
            }

            // Move user to main table
            // We know user.role is likely 'user', and type says string|null but schema says notNull with default.
            // Type inference might be tricky if schema definition was slightly different, but here it looks fine.
            await tx.insert(users).values({
                email: user.email,
                password: user.password,
                name: user.name,
                address: user.address,
                role: user.role || 'user', // Ensure role is present
            });

            // Remove from pending
            await tx
                .delete(pendingRegistrations)
                .where(eq(pendingRegistrations.id, user.id));
        });
    } catch (error: any) {
        console.error("Verification error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to verify email",
        });
    }

    return {
        message: "Email verified successfully. You can now login.",
    };
});
