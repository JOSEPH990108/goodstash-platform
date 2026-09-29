# 07 — Development Backlog & Sprint Plan
## Planning rules
- `P0` = Phase 1 launch requirement
- `P1` = first post-MVP work
- `P2` = later/community
- Story points are relative complexity, not calendar days.
- New Phase 1 scope must explicitly replace existing work or be approved as scope growth.

## Epic map
| Epic | Scope | Priority | Phase |
|---|---|---|---|
| E0 | Engineering Foundation | P0 | Phase 1 |
| E1 | Identity & RBAC | P0 | Phase 1 |
| E2 | Catalog & Taxonomy | P0 | Phase 1 |
| E3 | Recommendations & Publishing | P0 | Phase 1 |
| E4 | Consumer Discovery | P0 | Phase 1 |
| E5 | Search | P0 | Phase 1 |
| E6 | Favorites | P0 | Phase 1 |
| E7 | Marketplace & Redirect | P0 | Phase 1 |
| E8 | Media | P0 | Phase 1 |
| E9 | Admin CMS | P0 | Phase 1 |
| E10 | Analytics | P0 | Phase 1 |
| E11 | SEO, Performance & Accessibility | P0 | Phase 1 |
| E12 | Quality & Launch | P0 | Phase 1 |
| E13 | Post-MVP Discovery Enhancements | P1 | v1.1 |
| E14 | Community Foundation | P2 | Phase 2 |

## Sprint plan

### S0 — Foundation & delivery pipeline
- **Goal:** Establish a shippable skeleton and remove setup uncertainty.
- **Exit criterion:** Repo/CI/DB/design-token baseline works in preview.
- **Planned stories:** DEV-001, DEV-002, DEV-003, DEV-004, DEV-005
- Every sprint must end with a working increment in preview/staging, not documentation-only completion.

### S1 — Content core & Admin authoring
- **Goal:** Admin can create canonical Products and draft/publish curated Recommendations.
- **Exit criterion:** One Recommendation can be created in Admin and published to a stable public URL.
- **Planned stories:** DEV-010, DEV-011, DEV-012, DEV-020, DEV-021, DEV-022, DEV-023, DEV-030, DEV-031, DEV-032, DEV-033, DEV-090, DEV-091, DEV-092
- Every sprint must end with a working increment in preview/staging, not documentation-only completion.

### S2 — Consumer discovery & media
- **Goal:** Deliver the visible consumer discovery experience.
- **Exit criterion:** Home → Discover → Detail works responsively with real media/content.
- **Planned stories:** DEV-034, DEV-040, DEV-041, DEV-042, DEV-043, DEV-044, DEV-080, DEV-081, DEV-082
- Every sprint must end with a working increment in preview/staging, not documentation-only completion.

### S3 — Authentication & Favorites
- **Goal:** Introduce identity where it creates user value: saving.
- **Exit criterion:** Guest Save → Auth → Saved and My Stash work end-to-end.
- **Planned stories:** DEV-013, DEV-014, DEV-060, DEV-061, DEV-062, DEV-063
- Every sprint must end with a working increment in preview/staging, not documentation-only completion.

### S4 — Marketplace intent & analytics
- **Goal:** Make external referral navigation measurable and reliable.
- **Exit criterion:** Tracked /go redirect, marketplace management and core analytics are verifiable.
- **Planned stories:** DEV-070, DEV-071, DEV-072, DEV-073, DEV-093, DEV-100, DEV-101, DEV-102, DEV-103
- Every sprint must end with a working increment in preview/staging, not documentation-only completion.

### S5 — Search, SEO & launch hardening
- **Goal:** Close discovery gaps and pass release gates.
- **Exit criterion:** P0 UAT passes and production/rollback checklist is approved.
- **Planned stories:** DEV-050, DEV-051, DEV-052, DEV-094, DEV-110, DEV-111, DEV-112, DEV-113, DEV-121, DEV-122, DEV-123, DEV-124
- Every sprint must end with a working increment in preview/staging, not documentation-only completion.

## Detailed backlog

| ID | Epic | Story | Acceptance criterion | Pri | Pts | Sprint | Dependency |
|---|---|---|---|---:|---:|---|---|
| DEV-001 | E0 | Bootstrap repository and environments | Local, preview/staging and production configs are separated; secrets are not committed. | P0 | 3 | S0 | - |
| DEV-002 | E0 | Configure linting, formatting, typecheck and test commands | CI blocks merge on lint/type/test failure; commands run consistently locally. | P0 | 3 | S0 | DEV-001 |
| DEV-003 | E0 | Create database migration workflow | Drizzle migrations can be generated/applied in non-prod and production with documented rollback procedure. | P0 | 5 | S0 | DEV-001 |
| DEV-004 | E0 | Implement shared design tokens and app shells | GoodStash tokens power consumer/admin shells; wordmark can swap to GoodStuff without layout changes. | P0 | 5 | S0 | DEV-001 |
| DEV-005 | E0 | Add structured logging and error boundary baseline | Server errors have traceable logs; user-facing failures render safe fallback UI. | P0 | 3 | S0 | DEV-001 |
| DEV-010 | E1 | Integrate provider-agnostic authentication boundary for Admin | Session and user identity support protected Admin work independently of the final provider choice. | P0 | 5 | S1 | DEV-003 |
| DEV-011 | E1 | Implement Admin roles and protected routes/actions | Non-admin users cannot access Admin routes or actions; server checks are authoritative. | P0 | 3 | S1 | DEV-010 |
| DEV-012 | E1 | Implement Admin user status enforcement | Suspended/disabled users cannot access protected Admin actions; session policy is defined. | P0 | 2 | S1 | DEV-010 |
| DEV-013 | E1 | Implement consumer authentication UX | Provider-agnostic sign-in/sign-out/session UX supports the registered-user consumer journey. | P0 | 3 | S3 | DEV-010 |
| DEV-014 | E1 | Implement consumer account profile basics | Registered users can view/update supported profile fields and sign out. | P0 | 3 | S3 | DEV-013 |
| DEV-020 | E2 | Create Product entity and CRUD service | Product supports brand, slug, name, status and timestamps with validation. | P0 | 5 | S1 | DEV-003 |
| DEV-021 | E2 | Create Brand entity and admin management | Admin can create/edit/archive brands; duplicate slugs are prevented. | P0 | 3 | S1 | DEV-003 |
| DEV-022 | E2 | Create Categories and Tags taxonomy | Admin manages controlled categories and flexible tags; products/recommendations can associate as specified. | P0 | 5 | S1 | DEV-003 |
| DEV-023 | E2 | Implement status and slug uniqueness rules | Published URLs remain unique/stable and invalid status transitions are rejected. | P0 | 3 | S1 | DEV-020 |
| DEV-030 | E3 | Create Recommendation entity linked to Product | A Product can have multiple Recommendations; Recommendation has author, slug, status and content fields. | P0 | 5 | S1 | DEV-020 |
| DEV-031 | E3 | Implement recommendation editor data model | Supports headline, summary, body, why-recommended, pros, cons, best-for and optional price reference. | P0 | 5 | S1 | DEV-030 |
| DEV-032 | E3 | Implement draft → preview → publish workflow | Draft is not public; preview is admin-only; publish validates required fields and produces public URL. | P0 | 5 | S1 | DEV-030 |
| DEV-033 | E3 | Implement archive/unpublish behavior | Unpublished content disappears from public discovery while admin history remains. | P0 | 3 | S1 | DEV-032 |
| DEV-034 | E3 | Implement featured/editorial placement flags | Admin can mark featured items and define deterministic ordering/fallback. | P0 | 3 | S2 | DEV-032 |
| DEV-040 | E4 | Build mobile-first Home page | Home renders hero, featured, latest/popular blocks and category entry points from published data. | P0 | 5 | S2 | DEV-032,DEV-034 |
| DEV-041 | E4 | Build Discover page and category filtering | Users can browse published recommendations and change category without losing valid navigation state. | P0 | 5 | S2 | DEV-022,DEV-032 |
| DEV-042 | E4 | Build Recommendation Detail page | Page renders media, recommendation content, tags/category, save state and active marketplace options. | P0 | 8 | S2 | DEV-032,DEV-080 |
| DEV-043 | E4 | Build responsive desktop variants | P0 consumer pages meet documented breakpoints and desktop density rules. | P0 | 5 | S2 | DEV-040,DEV-041,DEV-042 |
| DEV-044 | E4 | Implement empty/error/loading states | P0 pages have defined loading, empty, unavailable and recoverable error UI. | P0 | 3 | S2 | DEV-040 |
| DEV-050 | E5 | Implement PostgreSQL search baseline | Search covers product/recommendation name, brand, category, tags and approved content fields. | P0 | 5 | S5 | DEV-020,DEV-030 |
| DEV-051 | E5 | Build search UI default/results/no-results | Search has default, result and no-result states; query persists appropriately. | P0 | 5 | S5 | DEV-050 |
| DEV-052 | E5 | Add search ranking and typo tolerance baseline | Results prioritize title/brand exact matches; trigram/FTS fallback handles common typos within performance target. | P0 | 5 | S5 | DEV-050 |
| DEV-060 | E6 | Create Favorites schema and uniqueness constraint | A user can favorite a recommendation once; duplicate action is idempotent. | P0 | 3 | S3 | DEV-003,DEV-030 |
| DEV-061 | E6 | Implement save/unsave interactions | Authenticated save state updates correctly across card/detail/favorites views. | P0 | 5 | S3 | DEV-060 |
| DEV-062 | E6 | Implement guest save → authentication → resume | Guest save triggers consumer auth; after successful auth the intended item is saved exactly once and user returns to context. | P0 | 5 | S3 | DEV-013,DEV-061 |
| DEV-063 | E6 | Build My Stash / Favorites page | User can view saved recommendations with empty state and open/remove items. | P0 | 5 | S3 | DEV-061 |
| DEV-070 | E7 | Create Marketplace and ProductLink models | One product can have multiple marketplace links with status, currency, price reference and primary flag. | P0 | 5 | S4 | DEV-020 |
| DEV-071 | E7 | Implement admin marketplace-link management | Admin can add, edit, disable and reprioritize links; invalid URLs are rejected. | P0 | 5 | S4 | DEV-070,DEV-090 |
| DEV-072 | E7 | Implement tracked /go/{code} redirect | Active code redirects to validated target; analytics failure never blocks valid redirect. | P0 | 8 | S4 | DEV-070,DEV-100 |
| DEV-073 | E7 | Implement unavailable-link handling | Inactive/missing links do not redirect and render safe recovery or fallback buying options. | P0 | 3 | S4 | DEV-072 |
| DEV-080 | E8 | Implement direct-to-object-storage upload flow | Admin obtains signed upload, stores metadata, and app never proxies large media through server unnecessarily. | P0 | 5 | S2 | DEV-003 |
| DEV-081 | E8 | Implement media attachment and ordering | Media can attach to product/recommendation with deterministic ordering and cover selection. | P0 | 3 | S2 | DEV-080 |
| DEV-082 | E8 | Implement image optimization metadata | Frontend receives suitable dimensions/variants and prevents major layout shift. | P0 | 3 | S2 | DEV-080 |
| DEV-090 | E9 | Build Admin shell and navigation | Admin has protected navigation for Dashboard, Products, Recommendations, Taxonomy, Users, Analytics and Settings as scoped. | P0 | 5 | S1 | DEV-011,DEV-004 |
| DEV-091 | E9 | Build Product/Recommendation management tables | Admin tables support status, search/filter basics and edit navigation. | P0 | 5 | S1 | DEV-020,DEV-030,DEV-090 |
| DEV-092 | E9 | Build recommendation editor UI | Editor maps to PRD fields, validates before publish, saves draft and previews. | P0 | 8 | S1 | DEV-031,DEV-090 |
| DEV-093 | E9 | Build taxonomy and marketplace admin screens | Admin can manage categories/tags/brands/marketplaces without direct DB operations. | P0 | 5 | S4 | DEV-021,DEV-022,DEV-070,DEV-090 |
| DEV-094 | E9 | Build user-management basics | Admin can inspect users and change supported status/role under authorization/audit rules. | P0 | 3 | S5 | DEV-011,DEV-012,DEV-090 |
| DEV-100 | E10 | Create analytics event schema/taxonomy | Events have stable names, entity IDs, timestamps and session/user context where permitted. | P0 | 5 | S4 | DEV-003 |
| DEV-101 | E10 | Track product/recommendation views | Public detail view events are deduplicated per defined window and do not block rendering. | P0 | 3 | S4 | DEV-100,DEV-042 |
| DEV-102 | E10 | Track favorite and outbound-click events | Save/unsave and outbound intents emit events with correct recommendation/product/link context. | P0 | 3 | S4 | DEV-100,DEV-061,DEV-072 |
| DEV-103 | E10 | Build Admin analytics overview | Admin can see views, favorites, outbound clicks, CTR and top content for selected period. | P0 | 8 | S4 | DEV-101,DEV-102,DEV-090 |
| DEV-110 | E11 | Implement metadata, sitemap and canonical URLs | Published recommendation pages have canonical metadata, social preview basics and sitemap inclusion. | P0 | 5 | S5 | DEV-032,DEV-042 |
| DEV-111 | E11 | Implement cache/revalidation strategy | Public pages revalidate after publish/update without serving stale critical state beyond agreed window. | P0 | 5 | S5 | DEV-032,DEV-040 |
| DEV-112 | E11 | Accessibility pass for P0 journeys | Keyboard, focus, labels, contrast and semantic structure pass agreed WCAG-oriented checklist. | P0 | 5 | S5 | DEV-040,DEV-042,DEV-063 |
| DEV-113 | E11 | Performance budget and image/LCP tuning | P0 routes meet documented performance budget on representative mobile conditions. | P0 | 5 | S5 | DEV-040,DEV-082,DEV-111 |
| DEV-120 | E12 | Create automated unit/integration test baseline | Critical domain rules have tests: publish validation, favorites uniqueness, permissions, redirect validation. | P0 | 5 | S0-S5 | DEV-002 |
| DEV-121 | E12 | Create P0 end-to-end smoke tests | Home→Detail→External; Guest Save→Auth→Favorite; Admin Draft→Publish paths are automated. | P0 | 8 | S5 | Core P0 complete |
| DEV-122 | E12 | Security and abuse-control baseline | CSRF/session policy, admin mutation protection, URL validation and rate limiting are reviewed and tested. | P0 | 5 | S5 | DEV-010,DEV-072 |
| DEV-123 | E12 | Production readiness and rollback checklist | Backups, env vars, migrations, monitoring, rollback and incident ownership are documented before launch. | P0 | 5 | S5 | All P0 |
| DEV-124 | E12 | UAT and launch acceptance | All launch-gate acceptance items are signed off; known non-blockers are documented. | P0 | 5 | S5 | DEV-121,DEV-123 |
| DEV-130 | E13 | Custom favorite collections | Users can create named collections and move/save recommendations into them. | P1 | 8 | Post-MVP | DEV-063 |
| DEV-131 | E13 | Recently viewed and related recommendations | Users can revisit recent content and see deterministic related items. | P1 | 5 | Post-MVP | DEV-101 |
| DEV-132 | E13 | Basic personalization rules | Home ordering can use explicit user/category signals without opaque ML dependency. | P1 | 8 | Post-MVP | Analytics volume |
| DEV-140 | E14 | Creator/public profile foundation | Schema and route can represent future creator identity without changing Product canonical model. | P2 | 8 | Phase 2 | Identity decision |
| DEV-141 | E14 | User-generated recommendation submission | Authorized users can create recommendations under moderation/publishing rules. | P2 | 13 | Phase 2 | DEV-140 |

## Definition of Ready

A story is Ready only when:
- intended outcome is understood
- acceptance criteria are testable
- dependencies/contracts exist
- required product/design decision is not still blocking
- security/privacy/data implications are understood where relevant
- story fits current sprint scope

## Definition of Done

A story is Done only when:
- acceptance criteria pass
- TypeScript/lint/tests/build pass
- relevant automated tests exist
- loading/empty/error/auth states are covered where applicable
- responsive behaviour is verified where applicable
- accessibility basics are checked
- analytics are added where specified
- migrations are reviewed/applied safely where relevant
- no secrets or debug-only code are committed
- documentation is updated if contract changed
- PR is reviewed and merged through the agreed workflow

## Phase 1 release gates

Release requires:
- P0 product journeys pass UAT
- CI is green
- production build passes
- database migrations have a reviewed deployment/recovery plan
- public SEO metadata/sitemap are valid
- critical redirect/auth/Admin paths are protected
- performance/accessibility baseline is acceptable
- production secrets/config are provisioned
- monitoring/operational ownership is defined
- rollback or forward-fix plan exists

## Open decision deadlines

| Decision | Must close by |
|---|---|
| Package manager | Sprint 0 |
| Authentication provider mix | Before Sprint 3 implementation |
| Rate-limit implementation | Before Sprint 4/5 production hardening |
| Error monitoring provider | Before staging UAT |
| Public name GoodStash vs GoodStuff | Before final launch SEO/assets |
