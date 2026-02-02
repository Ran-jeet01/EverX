import { defineEventHandler, getQuery } from "h3";
import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { desc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const category = query.category as string;

    let productQuery = db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));

    if (category && category !== "All") {
      //    @ts-ignore
      productQuery = db
        .select()
        .from(products)
        .where(eq(products.category, category))
        .orderBy(desc(products.createdAt));
    }

    const productList = await productQuery;
    return productList;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch products",
      message: error.message,
    });
  }
});
