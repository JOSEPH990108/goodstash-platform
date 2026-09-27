import { z } from "zod";

import { getSharedEnv } from "./shared";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
});

type ServerEnv = z.infer<typeof serverEnvSchema> & ReturnType<typeof getSharedEnv>;

let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  cachedServerEnv = {
    ...getSharedEnv(),
    ...serverEnvSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    }),
  };

  return cachedServerEnv;
}
