import { defineEventHandler, readBody, createError } from 'h3';
import { db } from '../../utils/drizzle';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const updateProfileSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    password: z.string().min(6).or(z.literal('')).optional(),
    currentPassword: z.string().optional(), // Required if changing password
});

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthenticated' });
    }

    const body = await readBody(event);
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: 'Invalid input',
            data: result.error.flatten(),
        });
    }

    const { name, address, password, currentPassword } = result.data;
    const updateData: any = {};

    if (name) updateData.name = name;
    if (address) updateData.address = address;

    if (password && password.length > 0) {
        if (!currentPassword) {
            throw createError({ statusCode: 400, message: 'Current password is required to set a new password' });
        }

        // Verify current password
        const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
        const validPassword = await bcrypt.compare(currentPassword, dbUser.password);
        if (!validPassword) {
            throw createError({ statusCode: 400, message: 'Invalid current password' });
        }

        updateData.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length === 0) {
        return { message: 'No changes made' };
    }

    const [updatedUser] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, user.id))
        .returning({
            id: users.id,
            name: users.name,
            email: users.email,
            address: users.address,
            role: users.role
        });

    return updatedUser;
});
