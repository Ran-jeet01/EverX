import { defineEventHandler, getQuery, createError } from "h3";
import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { desc, eq, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const category = query.category as string;
    const page = query.page ? parseInt(query.page as string) : 1;
    const limit = query.limit ? parseInt(query.limit as string) : undefined;
    const offset = limit ? (page - 1) * limit : undefined;

    let whereClause = undefined;
    if (category && category !== "All") {
      whereClause = eq(products.category, category);
    }

    // Build the query
    let productQuery = db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(desc(products.createdAt))
      .$dynamic();

    if (limit !== undefined) {
      productQuery = productQuery.limit(limit);
    }
    if (offset !== undefined) {
      productQuery = productQuery.offset(offset);
    }

    const productList = await productQuery;

    // Fetch total count for pagination
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(whereClause);

    const totalCount = Number(totalCountResult[0]?.count || 0);
    const totalPages = limit ? Math.ceil(totalCount / limit) : 1;

    return {
      products: productList,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch products",
      message: error.message,
    });
  }
});
