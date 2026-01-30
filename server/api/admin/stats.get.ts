import { db } from "../../utils/drizzle";
import { users } from "../../db/schemas/users";
import { sql } from "drizzle-orm";
import { fetchProducts } from "../../../app/service/products.service";

export default defineEventHandler(async (event) => {
  try {
    // 1. Get User Count
    const [userStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    if (!userStats) {
      throw new Error("Failed to get user stats");
    }
    const totalUsers = Number(userStats.count);

    const productsRaw = await $fetch("/api/product/products");
    const totalProducts = (productsRaw as any[]).length;

    // 3. Fake stats for others for now
    return {
      totalUsers,
      totalProducts,
      revenue: 0,
      activeSessions: 3,
    };
  } catch (e) {
    throw createError({ statusCode: 500, message: "Failed to fetch stats" });
  }
});
