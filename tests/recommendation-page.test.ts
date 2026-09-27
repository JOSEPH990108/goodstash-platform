import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import RecommendationDetailPage from "@/app/recommendations/[slug]/page";

describe("recommendation detail route shell", () => {
  it("renders the slug in the route heading", () => {
    const html = renderToStaticMarkup(
      RecommendationDetailPage({ params: { slug: "ergonomic-mouse" } }),
    );

    expect(html).toContain("Recommendation: ergonomic-mouse");
  });
});
