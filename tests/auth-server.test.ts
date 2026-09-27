import { beforeEach, describe, expect, it, vi } from "vitest";

const betterAuthMock = vi.fn((options) => options);
const drizzleAdapterMock = vi.fn<
  (db: unknown, config: { schema: Record<string, unknown> }) => unknown
>(() => vi.fn());

vi.mock("better-auth", () => ({
  betterAuth: betterAuthMock,
}));

vi.mock("better-auth/adapters/drizzle", () => ({
  drizzleAdapter: drizzleAdapterMock,
}));

describe("auth server foundation", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.NEXT_PUBLIC_BRAND_NAME = "GoodStash";
    process.env.BETTER_AUTH_SECRET = "test-secret";
    process.env.BETTER_AUTH_URL = "http://localhost:3000";
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/goodstash";
  });

  it("initializes Better Auth with Drizzle schema mapping", async () => {
    const authServer = await import("@/lib/auth/server");

    expect(authServer.auth).toBeDefined();
    expect(drizzleAdapterMock).toHaveBeenCalledTimes(1);

    const adapterCall = drizzleAdapterMock.mock.calls[0];
    const adapterConfig = adapterCall?.[1];

    expect(adapterConfig).toBeDefined();
    expect(adapterConfig?.schema).toBeDefined();

    expect(adapterConfig?.schema).toMatchObject({
      account: expect.anything(),
      session: expect.anything(),
      user: expect.anything(),
      verification: expect.anything(),
    });

    expect(betterAuthMock).toHaveBeenCalledWith(
      expect.objectContaining({
        appName: "GoodStash",
        baseURL: "http://localhost:3000",
      }),
    );
  });
});
