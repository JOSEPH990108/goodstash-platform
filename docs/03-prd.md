# 03 — Product Requirements Document (PRD)

## Product principles

1. **Discovery before commerce** — optimise finding, understanding, saving and leaving for an external store.
2. **Content over catalogue** — recommendation context is the core value.
3. **Public by default** — require login only where identity is needed.
4. **Low-friction outbound** — tracking must not make external navigation feel slow.
5. **Owner-curated first** — only Admin publishes in v1.0.
6. **Mobile-first** — core flows must work comfortably one-handed.
7. **Truthful presentation** — do not present unverifiable price/popularity/affiliate claims as facts.

## Working assumptions

| ID | Decision | Status |
|---|---|---|
| OD-001 | GoodStash is working wordmark; GoodStuff remains an active alternate | OPEN |
| OD-002 | Auth UI/architecture stays provider-agnostic until launch provider(s) are selected | OPEN |
| OD-003 | Favorites save the published Recommendation, not the raw Product | WORKING / baseline |
| OD-004 | Reference price is optional, manually managed and may vary externally | WORKING |
| OD-005 | Launch with a focused populated category set | OPEN |
| OD-006 | Collections target v1.1 unless promoted | WORKING |
| OD-007 | Core business events are stored internally; third-party analytics is additive | WORKING |

## Permission matrix

| Capability | Guest | User | Admin |
|---|---:|---:|---:|
| Browse public content | Yes | Yes | Yes |
| Search/filter | Yes | Yes | Yes |
| View recommendation detail | Yes | Yes | Yes |
| Open external store | Yes | Yes | Yes |
| Save/unsave | Auth required | Yes | Yes |
| Manage account | No | Yes | Yes |
| Create/edit drafts | No | No | Yes |
| Preview unpublished content | No | No | Yes |
| Publish/archive | No | No | Yes |
| Manage taxonomy/links | No | No | Yes |
| View Admin analytics | No | No | Yes |

## Core objects and states

| Object | Purpose | State rules |
|---|---|---|
| Product | Canonical real-world item | `DRAFT`, `ACTIVE`, `ARCHIVED` |
| Recommendation | Public editorial object tied to Product | `DRAFT` → `PUBLISHED` → `ARCHIVED` |
| Product Link | External marketplace destination | `ACTIVE`, `INACTIVE`, `BROKEN` |
| Favorite | User ↔ Recommendation relation | idempotent create/remove |
| Media | Product/Recommendation media | processing/ready/failed/removed |
| Redirect Code | Stable external-navigation identifier | resolves only to valid active destination |
| Analytics Event | Append-only user/business event | no purchase inference |

## P0 public surfaces

- `/` Home
- `/discover`
- category browsing
- `/search`
- `/r/[slug]` or equivalent stable recommendation URL
- `/saved` / My Stash
- `/account`
- `/go/[code]`

Exact route spelling may be refined in `06-technical-architecture.md`; behaviour must remain equivalent.

## Home & discovery requirements

- Home contains editorial brand message, Featured and other configured discovery modules.
- Latest/Popular sections are shown only when meaningful.
- Empty optional sections should not render as empty shells.
- Category shortcuts should prioritise categories containing published content.
- Recommendation cards show:
  - primary image
  - title/headline
  - concise recommendation context
  - optional reference price
  - marketplace hint
  - save control
- Guest can open detail without authentication.
- Returning from detail should preserve a reasonable list/scroll context.

## Search requirements

Search public published content across:
- Product name
- Brand
- Category
- Tags
- approved Recommendation text

Rules:
- no drafts/archived content in public results
- no-result state explains the result and gives recovery paths
- query should persist across normal navigation
- ranking should prioritise strong title/brand matches
- typo tolerance can use PostgreSQL FTS/trigram baseline

## Recommendation detail

The page should render, as available:
- media gallery
- Product identity
- recommendation headline and summary
- detailed body
- why recommended
- pros
- cons
- best for
- Categories/Tags
- save state
- active marketplace options
- optional reference price with non-authoritative semantics

Recommendation content appears before aggressive commerce actions.

On mobile:
- external purchase action may use sticky bottom CTA

On desktop:
- marketplace options may live in a right-side purchase panel

## Favorites / My Stash

### Registered user
- Save creates a Favorite for the Recommendation.
- Repeating Save must not create duplicates.
- Unsave removes that relation.
- My Stash lists current saved published Recommendations.

### Guest save continuation
1. Guest taps Save.
2. Store the intended recommendation/action safely.
3. Start authentication.
4. On successful auth, create the Favorite exactly once.
5. Return to the prior context or sensible fallback.
6. Reflect saved state.

If authentication is cancelled/failed, do not create the Favorite.

## Authentication

The final launch provider is not locked.

Required product behaviour:
- sign in
- sign out
- session-aware UI
- account basics
- credential recovery only if chosen provider requires it
- disabled users cannot access protected actions

Do not hard-code Google/Email/OTP assumptions into domain logic.

## External redirect

A marketplace CTA uses an internal redirect code.

Required behaviour:
1. validate `redirect_code`
2. validate Product Link status
3. resolve affiliate URL if available, otherwise original destination URL
4. record `outbound_click`
5. issue safe external redirect

Rules:
- invalid/inactive code never redirects to arbitrary stale URL
- tracking failure should not block a valid safe destination unless integrity/security requires it
- redirect path should add negligible perceived latency
- click ≠ purchase

## Admin CMS

Admin must be able to:
- create/edit Product separately from Recommendation
- create/edit Recommendation draft
- attach Product
- manage headline/summary/body/why/pros/cons/best-for
- assign categories/tags
- manage media
- manage marketplace links
- preview unpublished content securely
- publish after validation
- archive/unpublish without deleting analytics history
- replace/disable dead marketplace links without engineering assistance

### Publish validation baseline

A normal published recommendation requires:
- Product
- unique recommendation slug
- headline
- summary
- primary/valid media
- valid publish state
- at least one active Product Link, unless intentionally approved as informational-only

## Media

- reject unsupported type/size with useful error
- store meaningful metadata
- support alt text
- do not expose broken media references
- optimise image delivery for display size
- object storage, not local filesystem, is the production model

## Analytics

Canonical event names:
- `recommendation_view`
- `favorite_attempt`
- `favorite_saved`
- `favorite_removed`
- `outbound_click`
- `search_submitted`
- `category_view`
- `auth_started`
- `auth_completed`

Important:
- metric definitions must be stable and documented
- bots/prefetch traffic should not inflate commercial intent
- no purchase is inferred from an outbound click

## Required error/empty states

| Scenario | Required behaviour |
|---|---|
| No search results | Explain and offer browse/category recovery |
| Empty My Stash | Explain Save value and route to Discover |
| No active marketplace link | Keep content readable; hide/disable external CTA |
| Stale redirect code | Safe unavailable state |
| Archived recommendation | Do not expose draft data |
| Auth interrupted | Preserve intent/context when practical |
| Save request fails | Roll back optimistic state or clearly show failure |
| Analytics write fails | Browsing remains usable; safe redirect should normally continue |
| Publish validation fails | Field-level errors and no publish |

## Acceptance baseline for Phase 1

Phase 1 cannot be considered ready unless these journeys work end-to-end:

1. Admin → create Product → create Recommendation → preview → publish → public URL
2. Guest → browse → recommendation detail
3. Guest → Save → Auth → item saved exactly once
4. User → My Stash → reopen saved recommendation
5. User → marketplace CTA → `/go` → tracked redirect
6. Search → results/no-results
7. Admin → disable/replace broken Product Link
8. Admin → view core view/save/click metrics
