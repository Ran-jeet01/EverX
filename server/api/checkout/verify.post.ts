import { defineEventHandler, createError, readBody } from "h3";
import { db } from "../../utils/drizzle";
import { orders, cartItems } from "../../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, message: "Unauthenticated" });
    }

    const { data } = await readBody(event);
    if (!data) {
        throw createError({ statusCode: 400, message: "Encoded data is missing" });
    }

    // 1. Decode the data from eSewa
    const decodedDataString = Buffer.from(data, "base64").toString("utf-8");

    interface EsewaDecodedData {
        transaction_code: string;
        status: string;
        total_amount: string;
        transaction_uuid: string;
        product_code: string;
        signature: string;
        signed_field_names: string;
        [key: string]: any;
    }

    const decodedData = JSON.parse(decodedDataString) as EsewaDecodedData;

    // Expected fields: transaction_code, status, total_amount, transaction_uuid, product_code, signature, signed_field_names
    const { signature, signed_field_names } = decodedData;

    // 2. Verify signature dynamically
    const secretKey = "8gBm/:&EnhH.1/q";

    // eSewa v2 success response format: field1=val1,field2=val2...
    const fieldNames = signed_field_names.split(',');
    const message = fieldNames
        .map((field: string) => {
            const value = decodedData[field];
            return `${field}=${value}`;
        })
        .join(',');

    const localSignature = crypto
        .createHmac("sha256", secretKey)
        .update(message)
        .digest("base64");

    if (localSignature !== signature) {
        console.error("Signature Mismatch!", {
            message,
            localSignature,
            receivedSignature: signature
        });
        throw createError({ statusCode: 400, message: "Invalid signature" });
    }

    if (decodedData.status !== "COMPLETE") {
        throw createError({ statusCode: 400, message: "Payment not completed" });
    }

    // 3. Update Order and Clear Cart
    try {
        const [order] = await db
            .select()
            .from(orders)
            .where(eq(orders.transactionUuid, decodedData.transaction_uuid))
            .limit(1);

        if (!order || order.status !== 'pending') {
            throw createError({ statusCode: 404, message: "Order not found or already processed" });
        }

        await db.transaction(async (tx) => {
            await tx
                .update(orders)
                // .set({ status: "paid", updatedAt: new Date() })
                .set({ status: "pending", updatedAt: new Date() })
                .where(eq(orders.id, order.id));

            await tx.delete(cartItems).where(eq(cartItems.userId, user.id));
        });

        return { success: true, message: "Payment verified and order placed" };
    } catch (e: any) {
        console.error("Verification failed:", e);
        throw createError({ statusCode: 500, message: `Payment verification failed: ${e.message}` });
    }
});
