import { defineEventHandler, readMultipartFormData, readBody, createError } from 'h3';
import { db } from '../../utils/drizzle';
import { products } from '../../db/schemas/products';
import { uploadToCloudinary } from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
    try {
        const contentType = getHeader(event, "content-type") || "";
        let body: any = {};
        let imageFile: any = null;

        if (contentType.includes("multipart/form-data")) {
            const formData = await readMultipartFormData(event);
            if (!formData) {
                throw createError({
                    statusCode: 400,
                    statusMessage: "Bad Request",
                    message: "No form data received",
                });
            }

            for (const item of formData) {
                if (item.name === 'image' && item.filename) {
                    imageFile = item;
                } else if (item.name) {
                    body[item.name] = item.data.toString();
                }
            }
        } else {
            body = await readBody(event);
        }

        const { name, price, category, stock, description, image, status } = body;

        if (!name || !price || !category) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields',
            });
        }

        let imageUrl = image || null;
        if (imageFile) {
            const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString('base64')}`;
            const uploadResult = await uploadToCloudinary(base64Image, 'products');
            imageUrl = uploadResult.secure_url;
        }

        const [newProduct] = await db.insert(products).values({
            name,
            price: price.toString(),
            category,
            stock: stock ? parseInt(stock) : 0,
            description,
            image: imageUrl,
            status: status || (stock > 0 ? 'In Stock' : 'Out of Stock'),
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
