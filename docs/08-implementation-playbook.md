# 08 — Development Setup & Implementation Playbook

## Engineering principles

1. Keep the codebase simple enough for a small team but structured enough to scale.
2. Domain rules live outside presentation components.
3. Server authorization is authoritative.
4. No Phase 2 feature is implemented “just in case”.
5. Schema changes are explicit migrations.
6. Every sprint ships a working increment.
7. A green build is necessary but not sufficient; product acceptance criteria still matter.

## Technology baseline

Use the stack defined in `06-technical-architecture.md`.

Version policy:
- use current stable mutually compatible packages
- avoid unnecessary pre-release packages
- commit exactly one package-manager lockfile
- do not upgrade major dependencies casually inside feature PRs

## Local prerequisites

Expected:
- current supported Node.js LTS/current compatible release
- one chosen package manager
- Docker/Desktop or accessible PostgreSQL
- Git
- environment variables copied from `.env.example`

## Standard command contract

The repository should expose equivalent commands for:

```bash
# install
<package-manager> install

# local development
<package-manager> dev

# lint
<package-manager> lint

# type checking
<package-manager> typecheck

# tests
<package-manager> test

# production build
<package-manager> build

# database generate/migrate/seed
<package-manager> db:generate
<package-manager> db:migrate
<package-manager> db:seed
```

Exact command prefixes depend on the selected package manager, but the capabilities must exist.

## Environment variables

Rules:
- `.env*` secrets are never committed
- `.env.example` documents required keys without real credentials
- validate environment at startup/build using Zod or equivalent
- distinguish server-only and public variables
- `NEXT_PUBLIC_*` must contain no secret
- production and preview/staging credentials are isolated

Expected configuration groups:
- application URL/environment
- public brand name
- PostgreSQL
- auth secrets/provider credentials
- S3/object storage
- optional monitoring
- optional analytics provider

## Brand configuration

Do not scatter the word `GoodStash` through components.

Expose a central brand config such as:

```ts
export const appConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? "GoodStash",
};
```

The exact code can differ, but GoodStash → GoodStuff must remain cheap.

## Git / branching / PR strategy

Recommended:
- protected `main`
- short-lived feature branches
- one coherent story/slice per PR where practical
- Conventional Commit-style messages are preferred:
  - `feat:`
  - `fix:`
  - `refactor:`
  - `test:`
  - `docs:`
  - `chore:`

Do not merge when required CI is red.

PR description should include:
- scope
- Story/Requirement IDs
- UI evidence when visual
- test evidence
- migration/data impact
- security/privacy notes
- rollback/forward-fix notes for risky changes

## Coding standards

### TypeScript
- strict mode
- avoid `any` unless justified
- use explicit domain types/schemas
- validation occurs at trust boundaries
- do not trust client-supplied roles/user IDs

### React / Next.js
- prefer Server Components for read-heavy public rendering where appropriate
- use Client Components only when interaction/state requires them
- keep data/domain operations out of presentation components
- use loading/error boundaries intentionally
- public metadata generated server-side

### Forms/commands
- validate both shape and business rules
- return typed/domain-friendly errors
- user-visible errors never expose raw stack traces/SQL/provider secrets

## Error categories

Use consistent typed error categories, for example:
- `VALIDATION_ERROR`
- `UNAUTHENTICATED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `UNAVAILABLE`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

Exact names may differ; consistency matters.

## Drizzle migration workflow

1. change typed schema
2. generate migration
3. review generated SQL
4. test on fresh local DB
5. test on representative existing schema when applicable
6. commit schema + migration together
7. apply to preview/staging
8. verify
9. promote to production through controlled release

Rules:
- no silent production schema drift
- review destructive operations/defaults/indexes/backfills
- separate large backfills from risky schema DDL
- prefer expand → migrate → switch → contract for risky evolution
- production migration has recovery/backup plan

## Seed data

Development seed data must be:
- deterministic
- non-sensitive
- reset-safe

Separate essential bootstrap data (e.g. marketplaces/taxonomy) from demo content where practical.

## Authentication/authorization

- final provider mix closes before Sprint 3
- business role/status belongs to app domain
- every Admin action performs server-side authorization
- protected actions re-check account status/session
- route middleware can improve UX but does not replace domain authorization

## Media workflow

- Admin-only upload/write
- validate type/size before accepting
- upload to object storage
- record metadata after successful upload
- avoid local production media storage
- handle removed/in-use media safely
- provide alt text

## Redirect conventions

`/go/[code]` is a critical commercial-intent path.

It must:
- resolve an internal stable code
- reject invalid/inactive links
- validate destination
- record `outbound_click`
- redirect quickly
- avoid becoming an open redirect

Do not accept arbitrary external URL query parameters as redirect targets.

## Testing strategy

### Unit
Use for:
- domain validation
- state transitions
- slug/redirect helpers
- ranking/helper logic

### Integration
Use for:
- database uniqueness/constraints
- Favorite idempotency
- publish validation
- Admin authorization
- redirect resolution/event persistence

### E2E
At minimum automate critical Phase 1 paths:
1. Admin draft → publish → public detail
2. Guest Save → auth → saved
3. User opens My Stash
4. `/go` redirect
5. Search results/no-results
6. non-Admin cannot use Admin actions

Tests use deterministic non-sensitive data.

## CI

Every PR should run:
- install with lockfile integrity
- lint
- typecheck
- unit/integration tests
- production build

Add E2E when the test environment becomes available; critical flows must be part of release gating before production.

## Environment promotion

Suggested order:
1. Local
2. PR Preview
3. Staging/integration
4. Production

Production changes should come from reviewed, reproducible commits—not manual edits on production.

## Observability

Before production:
- structured server logging
- correlation/request context where practical
- redirect errors traceable
- Admin publish failures traceable
- auth failures traceable without leaking secrets
- selected error monitoring approach before staging UAT

Never log:
- passwords
- auth secrets
- access tokens
- raw provider secrets
- sensitive signed URLs when avoidable

## Sprint 0 exit checklist

Sprint 0 is complete only when:
- Next.js/TypeScript app starts from a fresh clone
- documented install/setup works
- env validation exists
- design tokens load
- consumer/admin shells render
- PostgreSQL/Drizzle migration workflow is proven
- lint/typecheck/test/build commands exist and pass
- at least one unit/domain proof exists
- at least one integration-style proof exists
- first PR can create a reviewable preview deployment
- no secrets are committed

## First product slice after Sprint 0

The preferred first end-to-end proof is:

> Admin Draft → Publish → Public Recommendation Detail

Implement in this order:
1. Brand/Product/Taxonomy
2. Recommendation model
3. Recommendation editor
4. publish validation
5. stable public Recommendation route
6. media/content rendering

## Phase order after Sprint 0

- **S1:** Content Core & Admin
- **S2:** Consumer Discovery
- **S3:** Identity & Favorites
- **S4:** Marketplace Intent & Analytics
- **S5:** Search, SEO & Launch Hardening

Do not start Phase 2 UGC/social work inside these sprints.
