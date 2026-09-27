import { z } from "zod";

const sharedEnvSchema = z.object({
  NEXT_PUBLIC_BRAND_NAME: z.enum(["GoodStash", "GoodStuff"]).default("GoodStash"),
});

type SharedEnv = z.infer<typeof sharedEnvSchema>;

export function getSharedEnv(): SharedEnv {
  return sharedEnvSchema.parse({
    NEXT_PUBLIC_BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME,
  });
}
