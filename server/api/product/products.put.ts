import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.id) {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Missing product ID",
            });
        }

        const updatedProduct = await db
            .update(products)
            .set({
                name: body.name,
                price: body.price?.toString(),
                category: body.category,
                stock: body.stock,
                description: body.description,
                image: body.image,
                status: body.stock > 0 ? "In Stock" : "Out of Stock",
                updatedAt: new Date(),
            })
            .where(eq(products.id, body.id))
            .returning();

        if (updatedProduct.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: "Not Found",
                message: "Product not found",
            });
        }

        return {
            message: "Product updated successfully",
            product: updatedProduct[0],
        };
    } catch (err: any) {
        console.error("ERROR updating product:", err.message);
        throw createError({
            statusCode: err.statusCode || 500,
            statusMessage: err.statusMessage || "Internal Server Error",
            message: err.message || "Failed to update product",
        });
    }
});
