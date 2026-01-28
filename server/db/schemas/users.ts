import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    password: text('password').notNull(),
    role: text('role').default('user').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export type User = InferSelectModel<typeof users>;
