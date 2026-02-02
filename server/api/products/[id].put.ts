import { defineEventHandler, readMultipartFormData, readBody, createError } from "h3";
import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing product ID",
      });
    }

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

    let imageUrl = image;
    if (imageFile) {
      const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString('base64')}`;
      const uploadResult = await uploadToCloudinary(base64Image, 'products');
      imageUrl = uploadResult.secure_url;
    }

    const updateData: any = {
      name,
      price: price?.toString(),
      category,
      stock: stock ? parseInt(stock) : undefined,
      description,
      image: imageUrl,
      status,
      updatedAt: new Date(),
    };

    // Auto update status if stock provided
    if (stock !== undefined && !status) {
      updateData.status = (parseInt(stock) || 0) > 0 ? "In Stock" : "Out of Stock";
    }

    // Remove undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const [updatedProduct] = await db
      .update(products)
      .set(updateData)
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
