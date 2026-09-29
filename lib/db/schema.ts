import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  authUserId: text("auth_user_id")
    .notNull()
    .unique()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  displayName: varchar("display_name", { length: 120 }),
  ...timestamps,
});

export const authUsers = pgTable("auth_users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const authSessions = pgTable("auth_sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
});

export const authAccounts = pgTable("auth_accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true,
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const authVerifications = pgTable("auth_verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
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

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 150 }).notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    status: varchar("status", { length: 20 }).default("ACTIVE").notNull(),
    ...timestamps,
  },
  (table) => ({
    statusCheck: check(
      "products_status_check",
      sql`${table.status} IN ('DRAFT', 'ACTIVE', 'ARCHIVED')`,
    ),
  }),
);

export const recommendations = pgTable(
  "recommendations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    authorUserId: uuid("author_user_id")
      .notNull()
      .references(() => users.id),
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    headline: text("headline").notNull(),
    summary: text("summary"),
    editorialNotes: text("editorial_notes"),
    status: varchar("status", { length: 20 }).default("DRAFT").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => ({
    statusCheck: check(
      "recommendations_status_check",
      sql`${table.status} IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
    ),
  }),
);

export const recommendationCategories = pgTable(
  "recommendation_categories",
  {
    recommendationId: uuid("recommendation_id")
      .notNull()
      .references(() => recommendations.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    uniquePair: uniqueIndex("recommendation_categories_unique").on(
      table.recommendationId,
      table.categoryId,
    ),
  }),
);

export const recommendationTags = pgTable(
  "recommendation_tags",
  {
    recommendationId: uuid("recommendation_id")
      .notNull()
      .references(() => recommendations.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    uniquePair: uniqueIndex("recommendation_tags_unique").on(
      table.recommendationId,
      table.tagId,
    ),
  }),
);

export const productLinks = pgTable(
  "product_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    marketplaceId: uuid("marketplace_id")
      .notNull()
      .references(() => marketplaces.id),
    externalId: varchar("external_id", { length: 150 }),
    label: text("label"),
    destinationUrl: text("destination_url").notNull(),
    affiliateUrl: text("affiliate_url"),
    redirectCode: varchar("redirect_code", { length: 32 }).notNull().unique(),
    displayPrice: numeric("display_price", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }),
    isPrimary: boolean("is_primary").default(false).notNull(),
    status: varchar("status", { length: 20 }).default("ACTIVE").notNull(),
    ...timestamps,
  },
  (table) => ({
    statusCheck: check(
      "product_links_status_check",
      sql`${table.status} IN ('ACTIVE', 'INACTIVE', 'BROKEN')`,
    ),
  }),
);

export const media = pgTable(
  "media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").references(() => products.id, {
      onDelete: "cascade",
    }),
    recommendationId: uuid("recommendation_id").references(
      () => recommendations.id,
      {
        onDelete: "cascade",
      },
    ),
    url: text("url").notNull(),
    altText: text("alt_text"),
    position: integer("position").default(0).notNull(),
    ...timestamps,
  },
  (table) => ({
    singleParentConstraint: check(
      "media_single_parent_check",
      sql`((${table.productId} IS NOT NULL AND ${table.recommendationId} IS NULL) OR (${table.productId} IS NULL AND ${table.recommendationId} IS NOT NULL))`,
    ),
  }),
);

export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recommendationId: uuid("recommendation_id")
      .references(() => recommendations.id, {
        onDelete: "cascade",
      })
      .notNull(),
    ...timestamps,
  },
  (table) => ({
    userRecommendationUnique: uniqueIndex(
      "favorites_user_recommendation_unique",
    ).on(table.userId, table.recommendationId),
  }),
);

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  recommendationId: uuid("recommendation_id").references(
    () => recommendations.id,
  ),
  productId: uuid("product_id").references(() => products.id),
  eventType: varchar("event_type", { length: 80 }).notNull(),
  payload: jsonb("payload")
    .$type<Record<string, unknown>>()
    .notNull()
    .default({}),
  ...timestamps,
});

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminUserId: uuid("admin_user_id").references(() => users.id),
  action: varchar("action", { length: 120 }).notNull(),
  targetType: varchar("target_type", { length: 120 }).notNull(),
  targetId: varchar("target_id", { length: 120 }).notNull(),
  metadata: jsonb("metadata")
    .$type<Record<string, unknown>>()
    .notNull()
    .default({}),
  ...timestamps,
});

export const productsRelations = relations(products, ({ many, one }) => ({
  recommendations: many(recommendations),
  links: many(productLinks),
  media: many(media),
}));

export const recommendationsRelations = relations(
  recommendations,
  ({ many, one }) => ({
    product: one(products, {
      fields: [recommendations.productId],
      references: [products.id],
    }),
    media: many(media),
  }),
);
