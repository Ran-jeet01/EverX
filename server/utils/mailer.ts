import nodemailer from "nodemailer";

export const sendResetEmail = async (email: string, token: string) => {
    const config = useRuntimeConfig();
    const user = config.smtpEmail;
    const pass = config.smtpPass;

    if (!user || !pass) {
        console.error('SMTP configuration missing in runtimeConfig (smtpEmail or smtpPass). Please check your .env file and nuxt.config.ts.');
        return false;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: user,
            pass: pass,
        },
    });

    const sender = {
        address: user,
        name: "EverX Auth",
    };

    const resetLink = `${process.env.APP_URL?.replace(/['"]+/g, '') || 'http://localhost:3000'}/auth/reset-password?token=${token}`;

    try {
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Reset your password",
            html: `
                <h1>Password Reset Request</h1>
                <p>You requested a password reset for your EverX account.</p>
                <p>Please click the link below to reset your password. This link will expire in 1 hour.</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        });

        console.log(`Reset email sent via Gmail to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending email via Gmail:', error);
        return false;
    }
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const config = useRuntimeConfig();
    const user = config.smtpEmail;
    const pass = config.smtpPass;

    if (!user || !pass) {
        console.error('SMTP configuration missing in runtimeConfig (smtpEmail or smtpPass). Please check your .env file and nuxt.config.ts.');
        return false;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: user,
            pass: pass,
        },
    });

    const sender = {
        address: user,
        name: "EverX Auth",
    };

    const verifyLink = `${process.env.APP_URL?.replace(/['"]+/g, '') || 'http://localhost:3000'}/auth/verify-email?token=${token}`;

    try {
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify your email address",
            html: `
                <h1>Email Verification</h1>
                <p>Thank you for registering with EverX.</p>
                <p>Please click the link below to verify your email address and activate your account.</p>
                <a href="${verifyLink}">${verifyLink}</a>
                <p>If you didn't request this, please ignore this email.</p>
            `,
        });

        console.log(`Verification email sent via Gmail to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending email via Gmail:', error);
        return false;
    }
};
