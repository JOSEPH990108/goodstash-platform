import type { Instrumentation } from "next";

import { logger } from "@/lib/logger";

export const onRequestError: Instrumentation.onRequestError = (
  error,
  _request,
  context,
) => {
  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? error.digest
      : undefined;

  logger.error("request_failed", {
    route: context.routePath,
    digest: typeof digest === "string" ? digest : undefined,
  });
};
