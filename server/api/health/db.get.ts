import { pool } from "../../utils/db";

export default defineEventHandler(async () => {
  try {
    const res = await pool.query("SELECT * FROM test_connection LIMIT 1");
    return { db: "connected", table_rows: res.rows.length };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
