import { defineEventHandler, readBody, createError } from "h3";
import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing product ID",
      });
    }

    const body = await readBody(event);
    const { name, price, category, stock, description, image, status } = body;

    const [updatedProduct] = await db
      .update(products)
      .set({
        name,
        price: price?.toString(),
        category,
        stock,
        description,
        image,
        status,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    if (!updatedProduct) {
      throw createError({
        statusCode: 404,
        statusMessage: "Product not found",
      });
    }

    return updatedProduct;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update product",
      message: error.message,
    });
  }
});
