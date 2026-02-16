import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { sendResetEmail } from "../../utils/mailer";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email is required",
        });
    }

    // Find user
    const userResult = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    const user = userResult[0];

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: "Account with this email not found",
        });
    }

    // Generate Token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    // Update User with Token and Expiry
    await db
        .update(users)
        .set({
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        })
        .where(eq(users.id, user.id));

    // Send Email
    const emailSent = await sendResetEmail(user.email, token);

    if (!emailSent) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to send reset email",
        });
    }

    return {
        message: "Password reset link has been sent to your email.",
    };
});
