import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);
        if (!formData) {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "No form data received",
            });
        }

        const fields: Record<string, any> = {};
        let imageFile: any = null;

        for (const item of formData) {
            if (item.name === 'image' && item.filename) {
                imageFile = item;
            } else if (item.name) {
                fields[item.name] = item.data.toString();
            }
        }

        const { name, price, category, stock, description } = fields;

        // Basic validation
        if (!name || !price || !category) {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: "Missing required fields (name, price, category)",
            });
        }

        let imageUrl = fields.image || null;
        if (imageFile) {
            // Upload to Cloudinary
            // We need to convert buffer to base64 for cloudinary.uploader.upload or use a stream
            const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString('base64')}`;
            const uploadResult = await uploadToCloudinary(base64Image, 'products');
            imageUrl = uploadResult.secure_url;
        }

        const newProduct = await db
            .insert(products)
            .values({
                name,
                price: price.toString(),
                category,
                stock: parseInt(stock) || 0,
                description: description || "",
                image: imageUrl,
                status: (parseInt(stock) || 0) > 0 ? "In Stock" : "Out of Stock",
            })
            .returning();

        if (!newProduct || newProduct.length === 0) {
            throw createError({
                statusCode: 500,
                message: "Failed to create product",
            });
        }

        return {
            message: "Product created successfully",
            product: newProduct[0],
        };
    } catch (err: any) {
        console.error("ERROR creating product:", err.message);
        throw createError({
            statusCode: err.statusCode || 500,
            statusMessage: err.statusMessage || "Internal Server Error",
            message: err.message || "Failed to create product",
        });
    }
});
