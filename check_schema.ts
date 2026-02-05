import { db } from "./server/utils/drizzle";
import { sql } from "drizzle-orm";

async function checkSchema() {
    try {
        const result = await db.execute(sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'orders'
        `);
        console.log("Columns in 'orders' table:", result);
    } catch (e) {
        console.error("Failed to check schema:", e);
    }
}

checkSchema();
