import { db } from "../../utils/drizzle";
import { sql, eq, and } from "drizzle-orm";
import { users } from "../../db/schemas/users";
import { orderItems } from "../../db/schemas/orderItems";
import { orders } from "../../db/schemas/orders";
import { products } from "../../db/schemas/products";

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

    const productsRaw = await $fetch("/api/products");
    const totalProducts = (productsRaw as any[]).length;
    // for total numbe of Ordered product
    // const [orderedProduct] = await db
    //   .select({ count: sql<number>`count(*)` })
    //   .from(orderItems);
    // const totalOrderedProduct = Number(orderedProduct.count);
    // // total revenue
    const [rev] = await db
      .select({
        totalRevenue: sql<number>`SUM(${orderItems.quantity} * ${orderItems.price})`,
      })
      .from(orderItems);
    const revenue = rev.totalRevenue;
    // data for NO of product sold each month
    const year = new Date().getFullYear();

    const rows = await db
      .select({
        m: sql<number>`EXTRACT(MONTH FROM ${orders.createdAt})`,
        q: sql<number>`COALESCE(SUM(${orderItems.quantity}), 0)`,
      })
      .from(orders)
      .innerJoin(orderItems, eq(orders.id, orderItems.orderId))
      .where(eq(sql`EXTRACT(YEAR FROM ${orders.createdAt})`, year))
      .groupBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`);

    const salesByMonth = Array(12).fill(0);
    rows.forEach((r) => (salesByMonth[Number(r.m) - 1] = Number(r.q)));

    // total product calculation (logic:Sum of product of all the month)

    const totalOrderedProduct = Number(
      salesByMonth.reduce((acc, curr) => acc + curr, 0),
    );

    console.log(salesByMonth, "hey");

    // Monthly Revenue (Revenue by Month)
    const revenueRows = await db
      .select({
        m: sql<number>`EXTRACT(MONTH FROM ${orders.createdAt})`,
        revenue: sql<number>`COALESCE(SUM(${orderItems.quantity} * ${orderItems.price}), 0)`,
      })
      .from(orders)
      .innerJoin(orderItems, eq(orders.id, orderItems.orderId))
      .where(eq(sql`EXTRACT(YEAR FROM ${orders.createdAt})`, year))
      .groupBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`);

    const monthlyRevenue = Array(12).fill(0);
    revenueRows.forEach(
      (r) => (monthlyRevenue[Number(r.m) - 1] = Number(r.revenue)),
    );

    // Previous Year Monthly Revenue
    const previousYear = year - 1;
    const previousRevenueRows = await db
      .select({
        m: sql<number>`EXTRACT(MONTH FROM ${orders.createdAt})`,
        revenue: sql<number>`COALESCE(SUM(${orderItems.quantity} * ${orderItems.price}), 0)`,
      })
      .from(orders)
      .innerJoin(orderItems, eq(orders.id, orderItems.orderId))
      .where(eq(sql`EXTRACT(YEAR FROM ${orders.createdAt})`, previousYear))
      .groupBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`);

    const previousMonthlyRevenue = Array(12).fill(0);
    previousRevenueRows.forEach(
      (r) => (previousMonthlyRevenue[Number(r.m) - 1] = Number(r.revenue)),
    );

    // Sales by Category
    const categoryRows = await db
      .select({
        category: products.category,
        sales: sql<number>`COALESCE(SUM(${orderItems.quantity}), 0)`,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .groupBy(products.category);

    const salesByCategory = categoryRows.map((r) => ({
      category: r.category,
      sales: Number(r.sales),
    }));

    console.log(salesByMonth, "hey");

    return {
      totalUsers,
      totalProducts,
      revenue,
      totalOrderedProduct,
      salesByMonth,
      monthlyRevenue,
      previousMonthlyRevenue,
      salesByCategory,
    };
  } catch (e) {
    throw createError({ statusCode: 500, message: "Failed to fetch stats" });
  }
});
