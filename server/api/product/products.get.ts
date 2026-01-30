import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const productList = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));

    return productList;
  } catch (err: any) {
    console.error("ERROR fetching products from DB:", err.message);
    throw createError({
      statusCode: 500,
      statusMessage: "Database Error",
      message: err.message || "Failed to fetch products from database",
    });
  }
});
