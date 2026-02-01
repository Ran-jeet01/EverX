import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = query.id as string;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Missing product ID",
      });
    }

    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (deletedProduct.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Product not found",
      });
    }

    return {
      message: "Product deleted successfully",
      id,
    };
  } catch (err: any) {
    console.error("ERROR deleting product:", err.message);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal Server Error",
      message: err.message || "Failed to delete product",
    });
  }
});
