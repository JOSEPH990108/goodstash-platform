import { defineConfig } from "drizzle-kit";

import { getServerEnv } from "./lib/env/server";

const env = getServerEnv();

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
