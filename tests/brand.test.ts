import { afterEach, describe, expect, it, vi } from "vitest";

describe("brand configuration", () => {
  it("uses GoodStash by default", async () => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_BRAND_NAME;

    const { getBrandConfig: getConfig } = await import("@/lib/brand");

    expect(getConfig().name).toBe("GoodStash");
  });

  it("accepts GoodStuff as alternate brand name", async () => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_BRAND_NAME = "GoodStuff";

    const { getBrandConfig: getConfig } = await import("@/lib/brand");

    expect(getConfig().name).toBe("GoodStuff");
  });
});

afterEach(() => {
  vi.resetModules();
});
