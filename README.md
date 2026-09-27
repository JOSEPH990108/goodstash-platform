# GoodStash Platform

GoodStash is a **curated product discovery and recommendation platform**.

The platform helps users discover useful products through curated recommendations, save products they are interested in, and continue to external ecommerce marketplaces to complete their purchase.

> **Working brand:** GoodStash  
> **Alternate retained brand:** GoodStuff  
>
> The public brand name must remain configurable so the product can switch between **GoodStash** and **GoodStuff** without application-wide rewrites.

---

## Product Concept

GoodStash sits **before** the ecommerce transaction:

```text
Discover
   ↓
Understand
   ↓
Save
   ↓
Visit Store
```

GoodStash is **not** an ecommerce marketplace in Phase 1.

External marketplaces such as Shopee, Lazada, Taobao, TikTok Shop, Amazon, or official brand stores remain responsible for:

- checkout
- payment
- orders
- delivery
- returns
- affiliate attribution
- affiliate payout

GoodStash focuses on:

- product discovery
- curated recommendation content
- saving/favorites
- search and categories
- outbound marketplace referral
- click/engagement analytics

---

# Phase 1 Product Model

Phase 1 is an:

> **Owner-curated product discovery platform**

Only the **Product Owner / Admin** can create and publish recommendations.

## Guest users can

- browse Home and Discover
- browse categories
- search published recommendations
- open recommendation detail pages
- view active marketplace options
- continue to external stores

## Registered users can

- perform all Guest actions
- save recommendations
- remove saved recommendations
- access **My Stash / Favorites**
- manage basic account information

## Admin users can

- manage Products
- manage Recommendations
- manage Brands
- manage Categories
- manage Tags
- manage Media
- manage Marketplaces
- manage Product Links
- preview/publish/archive Recommendations
- feature/order content
- view platform analytics

---

# Critical Domain Rule

A **Product** and a **Recommendation** are separate domain concepts.

## Product

A Product represents the canonical real-world item.

Example:

```text
Bosch Aerotwin Wiper
```

## Recommendation

A Recommendation represents editorial content explaining **why** that Product is worth attention.

Example:

```text
Why I recommend the Bosch Aerotwin after using it for six months.
```

Relationship:

```text
Product
   │
   ├── Recommendation A
   ├── Recommendation B
   └── Recommendation C
```

This separation is intentional.

Future versions may allow multiple users/creators to recommend the same Product without duplicating the canonical Product record.

> **Do not merge Product and Recommendation into one model.**

---

# Tech Stack

- **Next.js** — App Router
- **React**
- **TypeScript** — strict mode
- **Tailwind CSS**
- **shadcn/ui-ready structure**
- **PostgreSQL**
- **Drizzle ORM**
- **drizzle-kit**
- **Better Auth** foundation
- **Zod** environment/input validation
- **Vitest**
- **ESLint**
- **Prettier**
- **Docker PostgreSQL** for local development

Planned/expected later in Phase 1:

- S3-compatible object storage
- E2E testing for critical flows
- error monitoring / observability
- production rate limiting

---

# Repository Structure

Current Sprint 0 structure:

```text
goodstash-platform/
│
├─ .github/
│  ├─ workflows/
│  └─ copilot-instructions.md
│
├─ docs/
│  ├─ README.md
│  ├─ 01-product-overview.md
│  ├─ 02-brd.md
│  ├─ 03-prd.md
│  ├─ 04-sitemap-user-flows.md
│  ├─ 05-design-system.md
│  ├─ 06-technical-architecture.md
│  ├─ 07-development-backlog.md
│  └─ 08-implementation-playbook.md
│
├─ app/
│  ├─ api/
│  │  └─ health/
│  │     └─ route.ts
│  │
│  ├─ discover/
│  ├─ search/
│  ├─ recommendations/
│  │  └─ [slug]/
│  ├─ favorites/
│  ├─ account/
│  └─ admin/
│
├─ components/
│  └─ ui/
│
├─ lib/
│  ├─ auth/
│  ├─ db/
│  ├─ env/
│  ├─ brand.ts
│  └─ utils.ts
│
├─ src/
│  └─ modules/
│     ├─ auth/
│     ├─ users/
│     ├─ products/
│     ├─ recommendations/
│     ├─ categories/
│     ├─ tags/
│     ├─ marketplaces/
│     ├─ favorites/
│     ├─ media/
│     ├─ analytics/
│     └─ admin/
│
├─ .env.example
├─ docker-compose.yml
├─ drizzle.config.ts
├─ package.json
└─ README.md
```

The exact implementation can evolve, but the architectural intent must remain:

- routes/pages stay thin
- reusable domain/business logic belongs under `src/modules/*`
- shared infrastructure belongs under `lib/*`
- shared UI belongs under `components/*`

Do not move files purely for aesthetics if the existing structure already satisfies the architecture.

---

# Project Documentation

The `/docs` directory is the **product and engineering source of truth**.

| Document | Purpose |
|---|---|
| `docs/README.md` | Documentation map and source-of-truth rules |
| `docs/01-product-overview.md` | Product vision, positioning and phase strategy |
| `docs/02-brd.md` | Business requirements, business rules and scope |
| `docs/03-prd.md` | Product behaviour and acceptance requirements |
| `docs/04-sitemap-user-flows.md` | Routes, navigation and end-to-end user flows |
| `docs/05-design-system.md` | Brand, design tokens, components and responsive behaviour |
| `docs/06-technical-architecture.md` | Architecture, data model, APIs, security and analytics |
| `docs/07-development-backlog.md` | Epics, user stories, priorities and sprint plan |
| `docs/08-implementation-playbook.md` | Engineering workflow, migrations, testing and CI/CD |

Before implementing a feature:

1. read `.github/copilot-instructions.md`
2. read the relevant `/docs` files
3. identify the Story/Requirement IDs being implemented
4. avoid introducing undocumented scope

If two documents appear to conflict, **do not silently choose one**. Raise the conflict before implementation.

---

# Copilot Instructions

Repository-level Copilot rules live at:

```text
.github/copilot-instructions.md
```

Copilot must treat `/docs` as the project source of truth.

Important non-negotiable rules include:

- Phase 1 is owner-curated
- Product and Recommendation remain separate
- Favorites target Recommendations
- Admin permissions are enforced server-side
- external commerce stays outside GoodStash
- outbound marketplace navigation uses tracked internal redirects
- GoodStash / GoodStuff naming stays configurable
- no Phase 2 social/UGC features are introduced during Phase 1

---

# Phase 1 Exclusions

Do **not** implement the following unless the Product Owner explicitly changes scope:

- user-generated recommendations
- creator profiles
- follow system
- comments
- public likes
- messaging/chat
- internal cart
- internal checkout
- payment gateway
- order management
- delivery/shipping/fulfilment
- refund management
- affiliate commission ledger
- creator payouts
- cashback
- wallet
- loyalty points
- native iOS application
- native Android application
- advanced AI recommendation engine

Future architecture may allow these capabilities, but Phase 1 must not implement them prematurely.

---

# Brand Configuration

The working public brand is:

```text
GoodStash
```

The alternate retained name is:

```text
GoodStuff
```

Do not hard-code `GoodStash` across feature components.

Use the central brand configuration/environment layer.

Example:

```env
NEXT_PUBLIC_BRAND_NAME=GoodStash
```

The application should be able to switch to:

```env
NEXT_PUBLIC_BRAND_NAME=GoodStuff
```

without broad refactoring.

---

# Design Direction

The **GoodStash visual identity** remains the working design direction even if the final public name becomes GoodStuff.

## Core palette

| Token | Color |
|---|---|
| Coral / Primary | `#FF6846` |
| Mint / Secondary | `#9BE7C4` |
| Warm Cream / Background | `#FFF9F2` |
| Ink / Primary Text | `#22201E` |

## Brand personality

- Warm
- Friendly
- Curated
- Useful
- Trustworthy
- Lifestyle-oriented

The interface should feel like a curated discovery product.

Avoid turning the interface into a high-pressure ecommerce marketplace with excessive discount badges, countdown timers, voucher clutter, or misleading purchase language.

---

# Environment Variables

Create `.env` from `.env.example`.

```bash
cp .env.example .env
```

Environment files must remain gitignored except for `.env.example`.

Current Sprint 0 variables include:

```env
NEXT_PUBLIC_BRAND_NAME=GoodStash

DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

Additional Phase 1 variables may later include:

- object storage credentials/config
- authentication provider credentials
- monitoring/error tracking
- email/OTP configuration
- analytics integrations

> Never commit real credentials or secrets.

---

# Local Development

## 1. Install dependencies

```bash
npm install
```

## 2. Create local environment file

```bash
cp .env.example .env
```

## 3. Start PostgreSQL

```bash
docker compose up -d postgres
```

## 4. Run database migrations

```bash
npm run db:migrate
```

## 5. Start the application

```bash
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

---

# Database Commands

Generate Drizzle migrations:

```bash
npm run db:generate
```

Apply migrations:

```bash
npm run db:migrate
```

Open Drizzle Studio:

```bash
npm run db:studio
```

Database rules:

- every schema change must use an explicit migration
- generated SQL must be reviewed
- do not manually drift production schema
- destructive migrations require additional review/recovery planning

---

# Quality Commands

Before considering a development task complete, run:

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

Required checks must pass before merge.

---

# Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run Vitest |
| `npm run db:generate` | Generate Drizzle SQL migrations |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:studio` | Open Drizzle Studio |

---

# Git & Pull Request Workflow

Recommended flow:

```text
feature/fix/chore branch
        ↓
Pull Request
        ↓
CI + Review
        ↓
main
```

Use short-lived branches.

Preferred commit prefixes:

```text
feat:
fix:
refactor:
test:
docs:
chore:
```

Example:

```text
feat: add recommendation draft model
```

Pull Requests should include:

- related Story / Requirement IDs
- summary of changes
- testing performed
- migration/data impact
- screenshots for UI changes
- known limitations
- security/privacy impact where relevant
- any deviation from `/docs`

Do not merge required checks while red.

---

# Quality Expectations

A feature is not complete only because it compiles.

Where relevant, it must include:

- loading state
- empty state
- error state
- authentication/permission state
- mobile behaviour
- desktop behaviour
- accessibility basics
- analytics event
- automated tests
- migration review
- documentation updates

---

# Sprint 0 Status

Sprint 0 is the **engineering foundation** only.

Current Sprint 0 scope establishes:

- Next.js App Router
- React
- TypeScript strict mode
- Tailwind CSS
- GoodStash design tokens
- configurable GoodStash / GoodStuff brand name
- PostgreSQL
- Drizzle ORM
- Better Auth foundation
- Zod environment validation
- Docker PostgreSQL
- public route shells
- account route shells
- Admin route shell
- `/api/health`
- Vitest
- ESLint
- Prettier
- CI
- repository documentation

The repository intentionally does **not** contain the finished product yet.

---

# Development Roadmap

```text
Sprint 0
Engineering Foundation
        ↓
Sprint 1
Content Core + Admin CMS
        ↓
Sprint 2
Consumer Discovery
        ↓
Sprint 3
Authentication + Favorites
        ↓
Sprint 4
Marketplace Redirect + Analytics
        ↓
Sprint 5
Search + SEO + QA + Launch
```

Detailed stories and dependencies live in:

```text
docs/07-development-backlog.md
```

---

# Next Development Milestone

After Sprint 0 passes its exit criteria:

## Sprint 1 — Content Core & Admin CMS

Primary vertical slice:

```text
Admin
  ↓
Create Product
  ↓
Create Recommendation
  ↓
Preview
  ↓
Publish
  ↓
Public Recommendation Page
```

Sprint 1 establishes the core content domains:

- Brand
- Product
- Recommendation
- Category
- Tag
- Marketplace
- Product Link
- Media

Do not begin unrelated Phase 2 work during Sprint 1.

---

# Health Check

The application exposes:

```text
GET /api/health
```

This endpoint is used to verify that the application runtime is healthy.

It should remain lightweight and must not expose sensitive environment details.

---

# Current Open Decisions

## BRAND-01 — Public brand name

Options:

```text
GoodStash
GoodStuff
```

Current working value:

```text
GoodStash
```

## AUTH-01 — Authentication provider mix

The final launch combination is not yet locked.

Potential options include:

```text
Google OAuth
Email
Mobile OTP
```

Authentication architecture must remain flexible until this decision is final.

Other implementation-provider decisions may remain open until their relevant sprint, including:

- object storage provider
- error monitoring provider
- rate-limiting implementation
- production database provider

---

# Project Status

```text
Product Planning        ✅
Proposal                ✅
BRD                     ✅
PRD                     ✅
Sitemap / User Flows    ✅
Wireframes              ✅
Design System           ✅
Desktop / Admin UI      ✅
Technical Architecture  ✅
Development Backlog     ✅
Implementation Playbook ✅
Sprint 0                🚧
Sprint 1                ⏳
```

Current focus:

> **Complete Sprint 0 → Verify Engineering Foundation → Start Sprint 1**
