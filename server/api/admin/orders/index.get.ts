import { defineEventHandler, createError } from "h3";
import { db } from "../../../utils/drizzle";
import { orders, users } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const allOrders = await db.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
    with: {
      user: true,
      items: {
        with: {
          product: true,
        },
      },
    },
  });

  return allOrders;
});
