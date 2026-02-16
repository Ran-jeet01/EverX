import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    password: text('password').notNull(),
    role: text('role').default('user').notNull(),
    address: text('address'),
    resetPasswordToken: text('reset_password_token'),
    resetPasswordExpires: timestamp('reset_password_expires'),
    createdAt: timestamp('created_at').defaultNow(),
});

export type User = InferSelectModel<typeof users>;

