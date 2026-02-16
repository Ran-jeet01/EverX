import { z } from "zod";

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address" })
  .min(1, { message: "Email is required" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(100, { message: "Password is too long" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional().default(false),
});

//  Register Schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name is too long" }),
  email: emailSchema,
  password: passwordSchema,
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" })
    .max(200, { message: "Address is too long" }),
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
