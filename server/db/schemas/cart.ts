import { pgTable, uuid, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";
import { users } from "./users";
import { products } from "./products";

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  productId: uuid("product_id").references(() => products.id),
  quantity: integer("quantity").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export type CartItem = InferSelectModel<typeof cartItems>;
