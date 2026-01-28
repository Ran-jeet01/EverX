// import { users } from "~/server/db/schema";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
// import { signToken } from "~/server/utils/auth";
import { signToken } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
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
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  // Generate Token
  const token = signToken({ id: user.id, email: user.email, role: user.role });

  // Set Cookie
  setCookie(event, "auth_token", token, {
    httpOnly: false, // User requested access in composable via useCookie, so effectively allowing JS access or just same-site strict
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    token, // Optional: return token if client wants to use it directly
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
});
