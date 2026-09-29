DO $$
BEGIN
	IF EXISTS (
		SELECT 1 FROM "users" AS app_user
		LEFT JOIN "auth_users" AS auth_user ON auth_user."email" = app_user."email"
		WHERE auth_user."id" IS NULL
	) THEN
		RAISE EXCEPTION 'Cannot map every application user to Better Auth by exact email; resolve identity mapping before retrying.';
	END IF;
	IF EXISTS (SELECT 1 FROM "recommendations") THEN
		RAISE EXCEPTION 'Existing recommendations have no author identity; assign authors before applying this migration.';
	END IF;
	IF EXISTS (SELECT 1 FROM "favorites" WHERE "product_id" IS NOT NULL) THEN
		RAISE EXCEPTION 'Product-level Favorites are unsupported; resolve these records before applying this migration.';
	END IF;
	IF EXISTS (
		SELECT 1 FROM "products"
		WHERE "marketplace_id" IS NULL OR btrim("canonical_url") = ''
	) THEN
		RAISE EXCEPTION 'A Product destination has no marketplace or URL; resolve it before creating ProductLinks.';
	END IF;
	IF EXISTS (SELECT 1 FROM "products" WHERE "is_active" = false) THEN
		RAISE EXCEPTION 'Inactive Product state cannot be mapped safely to DRAFT or ARCHIVED; resolve before migration.';
	END IF;
	IF EXISTS (
		SELECT 1 FROM "product_categories" AS association
		LEFT JOIN "recommendations" AS recommendation
			ON recommendation."product_id" = association."product_id"
		GROUP BY association."product_id"
		HAVING count(recommendation."id") <> 1
	) THEN
		RAISE EXCEPTION 'Product category associations cannot be assigned unambiguously to one Recommendation.';
	END IF;
	IF EXISTS (
		SELECT 1 FROM "product_tags" AS association
		LEFT JOIN "recommendations" AS recommendation
			ON recommendation."product_id" = association."product_id"
		GROUP BY association."product_id"
		HAVING count(recommendation."id") <> 1
	) THEN
		RAISE EXCEPTION 'Product tag associations cannot be assigned unambiguously to one Recommendation.';
	END IF;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth_user_id" text;
--> statement-breakpoint
UPDATE "users" AS app_user
SET "auth_user_id" = auth_user."id"
FROM "auth_users" AS auth_user
WHERE auth_user."email" = app_user."email";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "auth_user_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth_user_id_auth_users_id_fk" FOREIGN KEY ("auth_user_id") REFERENCES "public"."auth_users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_auth_user_id_unique" UNIQUE ("auth_user_id");
--> statement-breakpoint
CREATE TABLE "product_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"marketplace_id" uuid NOT NULL,
	"external_id" varchar(150),
	"label" text,
	"destination_url" text NOT NULL,
	"affiliate_url" text,
	"redirect_code" varchar(32) NOT NULL,
	"display_price" varchar(32),
	"currency" varchar(3),
	"is_primary" boolean DEFAULT false NOT NULL,
	"status" varchar(20) DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_links_redirect_code_unique" UNIQUE ("redirect_code")
);
--> statement-breakpoint
INSERT INTO "product_links" (
	"product_id", "marketplace_id", "external_id", "destination_url", "redirect_code", "is_primary", "status"
)
SELECT "id", "marketplace_id", "external_id", "canonical_url",
	substr(replace(gen_random_uuid()::text, '-', ''), 1, 32), true, 'ACTIVE'
FROM "products";
--> statement-breakpoint
ALTER TABLE "product_links" ADD CONSTRAINT "product_links_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "product_links" ADD CONSTRAINT "product_links_marketplace_id_marketplaces_id_fk" FOREIGN KEY ("marketplace_id") REFERENCES "public"."marketplaces"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE TABLE "recommendation_categories" (
	"recommendation_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "recommendation_categories_recommendation_id_recommendations_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendations"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "recommendation_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
INSERT INTO "recommendation_categories" ("recommendation_id", "category_id")
SELECT recommendation."id", association."category_id"
FROM "product_categories" AS association
JOIN "recommendations" AS recommendation ON recommendation."product_id" = association."product_id";
--> statement-breakpoint
CREATE UNIQUE INDEX "recommendation_categories_unique" ON "recommendation_categories" USING btree ("recommendation_id", "category_id");
--> statement-breakpoint
CREATE TABLE "recommendation_tags" (
	"recommendation_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "recommendation_tags_recommendation_id_recommendations_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendations"("id") ON DELETE cascade ON UPDATE no action,
	CONSTRAINT "recommendation_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
INSERT INTO "recommendation_tags" ("recommendation_id", "tag_id")
SELECT recommendation."id", association."tag_id"
FROM "product_tags" AS association
JOIN "recommendations" AS recommendation ON recommendation."product_id" = association."product_id";
--> statement-breakpoint
CREATE UNIQUE INDEX "recommendation_tags_unique" ON "recommendation_tags" USING btree ("recommendation_id", "tag_id");
--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_single_target_check";
--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_product_id_products_id_fk";
--> statement-breakpoint
DROP INDEX "favorites_user_product_unique";
--> statement-breakpoint
ALTER TABLE "favorites" DROP COLUMN "product_id";
--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "recommendation_id" SET NOT NULL;
--> statement-breakpoint
DROP TABLE "product_categories";
--> statement-breakpoint
DROP TABLE "product_tags";
--> statement-breakpoint
ALTER TABLE "recommendations" ADD COLUMN "author_user_id" uuid;
--> statement-breakpoint
ALTER TABLE "recommendations" ALTER COLUMN "author_user_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_author_user_id_users_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_marketplace_id_marketplaces_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "marketplace_id";
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "external_id";
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "canonical_url";