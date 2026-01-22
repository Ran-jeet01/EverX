import { readFile } from "fs/promises";
import { join } from "path";

const filePath = join(process.cwd(), "server/mock/products.json");

console.log("Current working directory:", process.cwd());
console.log("Trying to read this exact file:", filePath);

let cachedData: any = null;

export default defineEventHandler(async () => {
  if (cachedData) return cachedData;

  try {
    console.log("Reading file...");
    const raw = await readFile(filePath, "utf-8");
    console.log("File content length:", raw.length);
    cachedData = JSON.parse(raw);
    console.log("Successfully parsed mock data");
    return cachedData;
  } catch (err: any) {
    console.error("ERROR loading mock data:");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load mock users",
      message: err.message || "Internal server error - mock data unavailable",
    });
  }
});
