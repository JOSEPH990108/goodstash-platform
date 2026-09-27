import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  displayName: varchar("display_name", { length: 120 }),
  ...timestamps,
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  ...timestamps,
});

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  ...timestamps,
});

export const marketplaces = pgTable("marketplaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  baseUrl: text("base_url").notNull(),
  ...timestamps,
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  marketplaceId: uuid("marketplace_id").references(() => marketplaces.id),
  externalId: varchar("external_id", { length: 150 }),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  canonicalUrl: text("canonical_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});

export const recommendations = pgTable("recommendations", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  headline: text("headline").notNull(),
  summary: text("summary"),
  editorialNotes: text("editorial_notes"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
});

export const productCategories = pgTable(
  "product_categories",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    uniquePair: uniqueIndex("product_categories_unique").on(
      table.productId,
      table.categoryId,
    ),
  }),
);

export const productTags = pgTable(
  "product_tags",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    uniquePair: uniqueIndex("product_tags_unique").on(table.productId, table.tagId),
  }),
);

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
  recommendationId: uuid("recommendation_id").references(() => recommendations.id, {
    onDelete: "cascade",
  }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  position: integer("position").default(0).notNull(),
  ...timestamps,
});

export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    recommendationId: uuid("recommendation_id").references(() => recommendations.id, {
      onDelete: "cascade",
    }),
    ...timestamps,
  },
  (table) => ({
    userProductUnique: uniqueIndex("favorites_user_product_unique").on(
      table.userId,
      table.productId,
    ),
    userRecommendationUnique: uniqueIndex("favorites_user_recommendation_unique").on(
      table.userId,
      table.recommendationId,
    ),
  }),
);

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  recommendationId: uuid("recommendation_id").references(() => recommendations.id),
  productId: uuid("product_id").references(() => products.id),
  eventType: varchar("event_type", { length: 80 }).notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
  ...timestamps,
});

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminUserId: uuid("admin_user_id").references(() => users.id),
  action: varchar("action", { length: 120 }).notNull(),
  targetType: varchar("target_type", { length: 120 }).notNull(),
  targetId: varchar("target_id", { length: 120 }).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
  ...timestamps,
});

export const productsRelations = relations(products, ({ many, one }) => ({
  marketplace: one(marketplaces, {
    fields: [products.marketplaceId],
    references: [marketplaces.id],
  }),
  recommendations: many(recommendations),
  media: many(media),
}));

export const recommendationsRelations = relations(recommendations, ({ many, one }) => ({
  product: one(products, {
    fields: [recommendations.productId],
    references: [products.id],
  }),
  media: many(media),
}));
