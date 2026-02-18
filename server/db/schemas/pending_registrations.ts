import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { type InferSelectModel } from 'drizzle-orm';

export const pendingRegistrations = pgTable('pending_registrations', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    password: text('password').notNull(), // Hashed password
    role: text('role').default('user').notNull(),
    address: text('address'),
    token: text('token').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export type PendingRegistration = InferSelectModel<typeof pendingRegistrations>;
