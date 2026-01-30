import { pgTable, uuid, text, integer, decimal, timestamp } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    category: text('category').notNull(),
    stock: integer('stock').default(0).notNull(),
    description: text('description'),
    image: text('image'),
    status: text('status').default('In Stock').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type Product = InferSelectModel<typeof products>;
