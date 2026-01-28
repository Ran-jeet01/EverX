import { checkAndCreateTable } from "../utils/db";

export default defineNitroPlugin(async () => {
  try {
    await checkAndCreateTable();
  } catch (err) {
    console.error("Cannot start server without DB connection. Exiting...");
    process.exit(1); // stop Nuxt if DB fails
  }
});
