import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const databaseUrl = process.env.TEST_DATABASE_URL;
const databaseSuite = describe.skipIf(!databaseUrl);
const client = databaseUrl
  ? new Client({ connectionString: databaseUrl })
  : undefined;

databaseSuite("fresh PostgreSQL migration", () => {
  beforeAll(async () => {
    await client?.connect();
  });

  afterAll(async () => {
    await client?.end();
  });

  it("applies the documented ownership and destination constraints", async () => {
    const result = await client?.query<{
      table_name: string;
      column_name: string;
      is_nullable: string;
    }>(`
      SELECT table_name, column_name, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name IN (
          'products', 'product_links', 'favorites',
          'recommendation_categories', 'recommendations', 'users'
        )
    `);

    const columns = new Set(
      result?.rows.map(
        ({ table_name, column_name }) => `${table_name}.${column_name}`,
      ),
    );

    expect(columns.has("products.marketplace_id")).toBe(false);
    expect(columns.has("products.canonical_url")).toBe(false);
    expect(columns.has("product_links.destination_url")).toBe(true);
    expect(columns.has("product_links.marketplace_id")).toBe(true);
    expect(columns.has("favorites.product_id")).toBe(false);
    expect(columns.has("recommendation_categories.recommendation_id")).toBe(
      true,
    );
    expect(columns.has("users.auth_user_id")).toBe(true);
    expect(columns.has("users.email")).toBe(false);
    expect(columns.has("recommendations.status")).toBe(true);

    const favoriteTarget = result?.rows.find(
      ({ table_name, column_name }) =>
        table_name === "favorites" && column_name === "recommendation_id",
    );
    expect(favoriteTarget?.is_nullable).toBe("NO");

    const constraints = await client?.query<{
      table_name: string;
      constraint_name: string;
      constraint_type: string;
    }>(`
      SELECT table_name, constraint_name, constraint_type
      FROM information_schema.table_constraints
      WHERE table_schema = 'public'
        AND table_name IN ('users', 'recommendations', 'products', 'product_links')
    `);

    expect(constraints?.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          table_name: "users",
          constraint_name: "users_auth_user_id_auth_users_id_fk",
          constraint_type: "FOREIGN KEY",
        }),
        expect.objectContaining({
          table_name: "recommendations",
          constraint_name: "recommendations_author_user_id_users_id_fk",
          constraint_type: "FOREIGN KEY",
        }),
        expect.objectContaining({
          table_name: "products",
          constraint_name: "products_status_check",
          constraint_type: "CHECK",
        }),
        expect.objectContaining({
          table_name: "product_links",
          constraint_name: "product_links_status_check",
          constraint_type: "CHECK",
        }),
      ]),
    );

    const favoriteIndexes = await client?.query<{ indexname: string }>(`
      SELECT indexname FROM pg_indexes
      WHERE schemaname = 'public' AND tablename = 'favorites'
    `);
    expect(favoriteIndexes?.rows.map(({ indexname }) => indexname)).toContain(
      "favorites_user_recommendation_unique",
    );
  });
});
