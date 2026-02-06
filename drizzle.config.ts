// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//     dialect: "postgresql",
//     schema: "./server/db/schema.ts",
//     out: "./server/db/migrations",
//     dbCredentials: {
//         url: process.env.DATABASE_URL!,
//     },
// });
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // These are very helpful when debugging Neon + drizzle
  verbose: true,
  strict: true,
}) satisfies Config;
