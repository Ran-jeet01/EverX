import { db } from "../utils/drizzle";
import { sql } from "drizzle-orm";

export default defineNitroPlugin(async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connected successfully");
  } catch (err: any) {
    console.error("Database connection failed:", err.message);

  }
});
