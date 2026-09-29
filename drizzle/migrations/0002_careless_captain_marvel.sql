DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM "products" WHERE "is_active" = false) THEN
		RAISE EXCEPTION 'Inactive Product state cannot be mapped safely to DRAFT or ARCHIVED; resolve before migration.';
	END IF;
END $$;
--> statement-breakpoint
ALTER TABLE "product_links" ALTER COLUMN "display_price" SET DATA TYPE numeric(12, 2) USING "display_price"::numeric(12, 2);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" varchar(20) DEFAULT 'ACTIVE' NOT NULL;--> statement-breakpoint
ALTER TABLE "recommendations" ADD COLUMN "status" varchar(20) DEFAULT 'DRAFT' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "product_links" ADD CONSTRAINT "product_links_status_check" CHECK ("product_links"."status" IN ('ACTIVE', 'INACTIVE', 'BROKEN'));--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_status_check" CHECK ("products"."status" IN ('DRAFT', 'ACTIVE', 'ARCHIVED'));--> statement-breakpoint
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_status_check" CHECK ("recommendations"."status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));