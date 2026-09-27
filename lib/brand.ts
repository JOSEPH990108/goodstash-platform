import { getSharedEnv } from "@/lib/env/shared";

export function getBrandConfig() {
  const env = getSharedEnv();

  return {
    name: env.NEXT_PUBLIC_BRAND_NAME,
  };
}
