import { pgTable, serial, timestamp, integer } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';
import { users } from './users';

export const cartItems = pgTable('cart_items', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    productId: integer('product_id'), // Assuming simple ID for now
    quantity: integer('quantity').default(1),
    createdAt: timestamp('created_at').defaultNow(),
});

export type CartItem = InferSelectModel<typeof cartItems>;
