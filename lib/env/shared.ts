import { z } from "zod";

const sharedEnvSchema = z.object({
  NEXT_PUBLIC_BRAND_NAME: z.enum(["GoodStash", "GoodStuff"]).default("GoodStash"),
});

type SharedEnv = z.infer<typeof sharedEnvSchema>;

let cachedSharedEnv: SharedEnv | null = null;

export function getSharedEnv(): SharedEnv {
  if (cachedSharedEnv) {
    return cachedSharedEnv;
  }

  cachedSharedEnv = sharedEnvSchema.parse({
    NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  });

  return cachedSharedEnv;
}
