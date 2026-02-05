import { defineEventHandler, createError } from "h3";
import { db } from "../../utils/drizzle";
import { orders, orderItems, cartItems, products } from "../../db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, message: "Unauthenticated" });
    }

    // 1. Fetch cart items to calculate total
    const userCartItems = await db
        .select({
            cartItem: cartItems,
            product: products,
        })
        .from(cartItems)
        .leftJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.userId, user.id));

    if (userCartItems.length === 0) {
        throw createError({ statusCode: 400, message: "Cart is empty" });
    }

    let total = 0;
    const orderItemsData: any[] = [];

    for (const item of userCartItems) {
        if (!item.product) continue;
        const price = parseFloat(item.product.price);
        const quantity = item.cartItem.quantity || 1;
        total += price * quantity;
        orderItemsData.push({
            productId: item.product.id,
            quantity: quantity,
            price: item.product.price,
        });
    }

    // 2. Create a pending order
    const transactionUuid = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const result = await db.transaction(async (tx) => {
            const [newOrder] = await tx
                .insert(orders)
                .values({
                    userId: user.id,
                    total: total.toFixed(2),
                    status: "pending",
                    address: user.address || "Address not provided",
                    transactionUuid: transactionUuid,
                })
                .returning();

            if (orderItemsData.length > 0) {
                await tx.insert(orderItems).values(
                    orderItemsData.map((item) => ({
                        orderId: newOrder.id,
                        ...item,
                    }))
                );
            }

            return newOrder;
        });

        // 3. Generate eSewa parameters 
        const productCode = "EPAYTEST";
        const secretKey = "8gBm/:&EnhH.1/q"; // Standard v2 UAT key
        const totalAmount = total.toFixed(2);
        const successUrl = `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`;
        const failureUrl = `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/failure`;

        // Signature String format for eSewa v2: 
        // total_amount=110,transaction_uuid=11-002-33,product_code=EPAYTEST
        // Ensure no spaces and exact order
        const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
        const signature = crypto
            .createHmac("sha256", secretKey)
            .update(message)
            .digest("base64");

        return {
            amount: totalAmount,
            tax_amount: "0",
            product_service_charge: "0",
            product_delivery_charge: "0",
            total_amount: totalAmount,
            transaction_uuid: transactionUuid,
            product_code: productCode,
            success_url: successUrl,
            failure_url: failureUrl,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            signature: signature,
        };
    } catch (e: any) {
        console.error("eSewa initiation failed:", e);
        throw createError({
            statusCode: 500,
            statusMessage: `Payment initiation failed: ${e.message || 'Unknown error'}`
        });
    }
});
