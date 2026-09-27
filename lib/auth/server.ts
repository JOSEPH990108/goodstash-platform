import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/lib/db/client";
import { getServerEnv } from "@/lib/env/server";
import * as schema from "@/lib/db/schema";

const env = getServerEnv();

export const auth = betterAuth({
  appName: env.NEXT_PUBLIC_BRAND_NAME,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {},
});
