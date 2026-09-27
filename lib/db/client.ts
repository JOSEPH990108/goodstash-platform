import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { getServerEnv } from "@/lib/env/server";

import * as schema from "./schema";

const env = getServerEnv();

const globalForDb = globalThis as typeof globalThis & {
  __goodstashDbPool?: Pool;
};

const pool =
  globalForDb.__goodstashDbPool ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__goodstashDbPool = pool;
}

export const db = drizzle(pool, { schema });
