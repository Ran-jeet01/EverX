
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';

// Best practice: use query client for serverless/edge environments if needed,
// but for standard Node/Nuxt, postgres.js is great.
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
