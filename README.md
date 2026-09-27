# GoodStash Platform

GoodStash is a curated product discovery and recommendation platform.

> Brand naming is configurable through environment variables so the product can be renamed to **GoodStuff** without application-wide rewrites.

## Tech stack
- Next.js (App Router)
- TypeScript (strict mode)
- React
- Tailwind CSS
- shadcn/ui-ready structure (`components/ui`, `lib/utils.ts`)
- PostgreSQL
- Drizzle ORM + drizzle-kit
- Better Auth foundation
- Zod environment validation
- Vitest
- ESLint + Prettier

## Project structure

```text
app/                      # routes and API handlers
  api/health/route.ts
  discover/
  search/
  recommendations/[slug]/
  favorites/
  account/
  admin/
components/
  ui/                     # shadcn/ui-ready components
lib/
  auth/                   # Better Auth foundation
  db/                     # Drizzle client + schema
  env/                    # Zod-validated env loading
  brand.ts                # brand configuration
src/modules/
  auth users products recommendations categories tags marketplaces favorites media analytics admin
```

## Environment variables
Create `.env` from `.env.example`.
Environment files are intentionally gitignored (except `.env.example`) and should not be committed.

- `NEXT_PUBLIC_BRAND_NAME` (`GoodStash` or `GoodStuff`)
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

## Local development

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run dev
```

## Database commands

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

## Available scripts
- `npm run dev` - start Next.js dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - run ESLint
- `npm run format` - run Prettier
- `npm run typecheck` - run TypeScript type check
- `npm run test` - run Vitest
- `npm run db:generate` - generate Drizzle SQL migrations
- `npm run db:migrate` - apply Drizzle migrations
- `npm run db:studio` - open Drizzle Studio

## Sprint 0 status
This repository intentionally contains only the engineering foundation and route/module shells.
No social, UGC, checkout, payment, order, cashback, wallet, or commission payout flows are implemented.
