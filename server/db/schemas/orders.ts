import { pgTable, uuid, text, decimal, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { users } from './users';
import { orderItems } from './orderItems';

export const orders = pgTable('orders', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    status: text('status').default('pending').notNull(),
    address: text('address').notNull(),
    transactionUuid: text('transaction_uuid'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    items: many(orderItems),
}));

export type Order = InferSelectModel<typeof orders>;
