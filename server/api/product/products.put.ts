import { db } from "../../utils/drizzle";
import { products } from "../../db/schemas/products";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  try {
    let body: any = {};
    let imageFile: any = null;

    const contentType = getHeader(event, "content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await readMultipartFormData(event);
      if (!formData) {
        throw createError({
          statusCode: 400,
          message: "No form data received",
        });
      }

      for (const item of formData) {
        if (item.name === "image" && item.filename) {
          imageFile = item;
        } else if (item.name) {
          body[item.name] = item.data.toString();
        }
      }
    } else {
      body = await readBody(event);
    }

    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Missing product ID",
      });
    }

    // Prepare update data
    const updateData: any = {
      name: body.name,
      price: body.price?.toString(),
      category: body.category,
      stock: body.stock ? parseInt(body.stock) : undefined,
      description: body.description,
      updatedAt: new Date(),
    };

    if (body.stock !== undefined) {
      updateData.status =
        (parseInt(body.stock) || 0) > 0 ? "In Stock" : "Out of Stock";
    }

    // Handle Image Update
    if (imageFile) {
      const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`;
      const uploadResult = await uploadToCloudinary(base64Image, "products");
      updateData.image = uploadResult.secure_url;
    } else if (body.image) {
      updateData.image = body.image;
    }

    // Remove undefined keys
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key],
    );

    const updatedProduct = await db
      .update(products)
      .set(updateData)
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
