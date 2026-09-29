import "server-only";

type ErrorLogContext = {
  route?: string;
  digest?: string;
};

function safeValue(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.replace(/[\r\n]/g, "").slice(0, 128);
}

function safeDigest(value: string | undefined): string | undefined {
  return value && /^[a-zA-Z0-9_-]{1,128}$/.test(value) ? value : undefined;
}

export const logger = {
  error(event: "request_failed", context: ErrorLogContext = {}) {
    const entry = {
      level: "error",
      event,
      timestamp: new Date().toISOString(),
      route: safeValue(context.route),
      digest: safeDigest(context.digest),
    };

    console.error(JSON.stringify(entry));
  },
};
