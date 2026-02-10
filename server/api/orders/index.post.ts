import { defineEventHandler, createError, readBody } from "h3";
import { db } from "../../utils/drizzle";
import { orders, orderItems, cartItems, products, users } from "../../db/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({ statusCode: 401, message: "Unauthenticated" });
  }

  // fetch cart items
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

  // Calculate total and prepare order item
  let total = 0;
  const orderItemsData: {
    productId: string;
    quantity: number;
    price: string;
  }[] = [];

  for (const item of userCartItems) {
    if (!item.product) continue;
    const price = parseFloat(item.product.price);
    const quantity = item.cartItem.quantity || 1;

    total += price * quantity;
    orderItemsData.push({
      productId: item.product.id,
      quantity: quantity,
      price: item.product.price, // Store snapshot of price
    });
  }

  // Use transaction
  try {
    const result = await db.transaction(async (tx) => {
      // Fetch fresh user data
      const userResult = await tx
        .select()
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);

      const dbUser = userResult[0];
      const address = dbUser?.address || "Address not provided";

      // Create Order
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId: user.id,
          total: total.toFixed(2),
          status: "pending",
          address: address,
        })
        .returning();

      // Create Order Items
      if (orderItemsData.length > 0) {
        await tx.insert(orderItems).values(
          orderItemsData.map((item) => ({
            orderId: newOrder.id,
            ...item,
          })),
        );
      }

      // Clear Cart
      await tx.delete(cartItems).where(eq(cartItems.userId, user.id));

      return newOrder;
    });

    return result;
  } catch (e) {
    console.error("Order creation failed", e);
    throw createError({ statusCode: 500, message: "Order creation failed" });
  }
});
