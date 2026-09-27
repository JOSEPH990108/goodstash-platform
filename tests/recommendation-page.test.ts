import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import RecommendationDetailPage from "@/app/recommendations/[slug]/page";

describe("recommendation detail route shell", () => {
  it("renders the slug in the route heading", async () => {
    const page = await RecommendationDetailPage({
      params: Promise.resolve({ slug: "ergonomic-mouse" }),
    });

    const html = renderToStaticMarkup(page);

    expect(html).toContain("Recommendation: ergonomic-mouse");
  });
});
