import { pgTable, serial, uuid, integer, decimal } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { orders } from './orders';
import { products } from './products';

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: uuid('order_id').references(() => orders.id).notNull(),
    productId: uuid('product_id').references(() => products.id).notNull(),
    quantity: integer('quantity').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));

export type OrderItem = InferSelectModel<typeof orderItems>;
