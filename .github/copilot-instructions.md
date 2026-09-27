# GoodStash Platform Copilot Instructions

## Architecture
- This repository is a modular monolith built with Next.js App Router and TypeScript strict mode.
- Keep module boundaries under `src/modules/*` and shared infrastructure under `lib/*`.
- `Product` is the canonical product record.
- `Recommendation` is curated editorial content linked to a product (`recommendations.productId`) and must remain a separate concept.

## Sprint 0 / Phase 1 Boundaries
- Build only the engineering foundation for auth, users, products, recommendations, categories, tags, marketplaces, favorites, media, analytics, and admin.
- Do not introduce Phase 2 features: social graphs, comments, follows, checkout, payments, orders, cashback, wallet, commission payouts, or other UGC workflows.
- Keep brand naming configurable via environment (`NEXT_PUBLIC_BRAND_NAME`) so `GoodStash` can be renamed to `GoodStuff` without broad refactors.

## Engineering Practices
- Use Zod-validated environment configuration and avoid direct unchecked `process.env` access in feature code.
- Use Drizzle ORM schema-first changes and generate SQL migrations with `npm run db:generate`.
- Keep route handlers and UI pages as shells in Sprint 0; avoid fake business logic.
