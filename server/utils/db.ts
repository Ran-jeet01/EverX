import { Pool } from "pg";

// Read your DATABASE_URL from .env
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to check connection and create a table
export async function checkAndCreateTable() {
  try {
    // Test query (just to see if connected)
    await pool.query("SELECT 1");

    // Create a test table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Everrr (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("✅ PostgreSQL connected and test table created!");
  } catch (err: any) {
    console.error("❌ PostgreSQL connection failed:", err.message);
    throw err; // so Nuxt knows something went wrong
  }
}
