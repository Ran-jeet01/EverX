import { defineEventHandler, readBody, createError } from 'h3';
import { db } from '../../utils/drizzle';
import { products } from '../../db/schemas/products';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { name, price, category, stock, description, image, status } = body;

        if (!name || !price || !category) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields',
            });
        }

        const [newProduct] = await db.insert(products).values({
            name,
            price: price.toString(), // decimal in drizzle is string for precision
            category,
            stock: stock || 0,
            description,
            image,
            status: status || 'In Stock',
        }).returning();

        return newProduct;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create product',
            message: error.message,
        });
    }
});
