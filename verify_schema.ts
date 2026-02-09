import { db } from "./server/utils/drizzle";
import { sql } from "drizzle-orm";



async function verifySchema() {
    try {
        console.log("Verifying schema...");

        // Check orders table for 'address' column
        const ordersColumns = await db.execute(sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'orders' AND column_name = 'address'
        `);

        if (ordersColumns.length > 0) {
            console.log("SUCCESS: 'address' column found in 'orders' table.");
        } else {
            console.error("FAILURE: 'address' column NOT found in 'orders' table.");
        }

        // Check products table for 'gender_category' column (should be gone)
        const productsColumns = await db.execute(sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'products' AND column_name = 'gender_category'
        `);

        if (productsColumns.length === 0) {
            console.log("SUCCESS: 'gender_category' column correctly removed from 'products' table.");
        } else {
            console.error("FAILURE: 'gender_category' column still exists in 'products' table.");
        }

    } catch (e) {
        console.error("Verification failed:", e);
    }
    process.exit(0);
}

verifySchema();
