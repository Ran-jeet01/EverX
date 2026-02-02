import { defineEventHandler, getCookie } from "h3";
import { verifyToken } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  // Skip auth check for public assets
  if (!token) {
    return;
  }

  try {
    const payload = verifyToken(token);
    if (payload && typeof payload !== "string") {
      event.context.user = payload;
    }
  } catch (e) {
    // Token invalid or expired
  }
});
