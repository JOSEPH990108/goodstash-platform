import { getTableConfig } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";

import {
  authUsers,
  favorites,
  productLinks,
  products,
  recommendationCategories,
  recommendations,
  users,
} from "@/lib/db/schema";

describe("database foundation schema", () => {
  it("keeps canonical Products separate from marketplace destinations and Recommendations", () => {
    const productColumns = getTableConfig(products).columns.map(
      (column) => column.name,
    );
    const productLinkColumns = getTableConfig(productLinks).columns.map(
      (column) => column.name,
    );

    expect(productColumns).not.toContain("marketplace_id");
    expect(productColumns).not.toContain("canonical_url");
    expect(productColumns).toContain("status");
    expect(productLinkColumns).toContain("marketplace_id");
    expect(productLinkColumns).toContain("destination_url");
    expect(getTableConfig(recommendations).columns).toContain(
      recommendations.productId,
    );
    expect(getTableConfig(recommendations).columns).toContain(
      recommendations.authorUserId,
    );
  });

  it("limits Favorites and taxonomy associations to Recommendations", () => {
    const favoriteColumns = getTableConfig(favorites).columns.map(
      (column) => column.name,
    );
    const categoryColumns = getTableConfig(
      recommendationCategories,
    ).columns.map((column) => column.name);

    expect(favoriteColumns).toContain("recommendation_id");
    expect(favoriteColumns).not.toContain("product_id");
    expect(favorites.recommendationId.notNull).toBe(true);
    expect(categoryColumns).toContain("recommendation_id");
    expect(categoryColumns).not.toContain("product_id");
  });

  it("maps each application profile to a Better Auth identity", () => {
    const appUserColumns = getTableConfig(users).columns.map(
      (column) => column.name,
    );

    expect(appUserColumns).toContain("auth_user_id");
    expect(appUserColumns).not.toContain("email");
    expect(users.authUserId.notNull).toBe(true);
    expect(getTableConfig(authUsers).name).toBe("auth_users");
  });
});
