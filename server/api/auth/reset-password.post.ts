import { users } from "../../db/schema";
import { eq, and, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { token, password } = body;

    if (!token || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Token and password are required",
        });
    }

    // Find user with valid token and not expired
    const userResult = await db
        .select()
        .from(users)
        .where(
            and(
                eq(users.resetPasswordToken, token),
                gt(users.resetPasswordExpires, new Date())
            )
        )
        .limit(1);

    const user = userResult[0];

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid or expired token",
        });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user and clear token
    await db
        .update(users)
        .set({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        })
        .where(eq(users.id, user.id));

    return {
        message: "Password has been reset successfully.",
    };
});
