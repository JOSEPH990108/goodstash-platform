# GoodStash Repository Instructions

Treat `/docs` as the product and engineering source of truth. Before meaningful work, read `docs/README.md` and the relevant design, architecture, backlog, and implementation documents. Resolve conflicts explicitly instead of inventing product decisions.

Implement only the story assigned to the active sprint. Do not start later-sprint behavior or Phase 2 scope without explicit approval. Follow `AGENTS.md` for installed Next.js-specific guidance.

Repository-wide domain rules:

- Product is the canonical real-world product; Recommendation is separate editorial content and references Product.
- Favorites target Recommendations only. Marketplace destinations belong to ProductLinks, not Products.
- Commerce remains external; an outbound click is not a purchase.
- Keep business logic outside route/UI layers and enforce trusted decisions server-side.
- Keep `NEXT_PUBLIC_BRAND_NAME` configurable through the central brand/environment layer.
- Validate trust-boundary input, keep secrets out of source/logs, and never expose internal errors to users.
- Schema changes require reviewed, forward-safe Drizzle migrations and automated tests for changed behavior.

Use the quality gates and task-specific conventions in `docs/08-implementation-playbook.md`. Keep changes scoped to the active story; update documentation when a contract changes.

- use loading/error/not-found states intentionally
- public metadata should be generated server-side
- authenticated/private pages must not be indexed
- do not expose server-only data/config to the client

---

# 9. TypeScript Rules

TypeScript runs in strict mode.

Requirements:

- avoid `any`
- never disable type checking broadly to silence an error
- use explicit domain types
- validate untrusted data before treating it as typed domain data
- prefer discriminated unions or typed error/result objects for stateful domain behaviour
- do not trust client-supplied role, user ID, ownership or publication status

If `any` is genuinely unavoidable, document why in the code/PR.

---

# 10. Environment Configuration

Use Zod-validated environment configuration.

Feature code should not read unchecked `process.env` directly.

Rules:

- environment access goes through the approved env/config layer
- `.env` files stay uncommitted
- `.env.example` documents required keys without real values
- `NEXT_PUBLIC_*` variables must never contain secrets
- production/preview/local secrets remain isolated

Do not commit:

- secrets
- passwords
- API tokens
- signed private credentials
- production database credentials

---

# 11. Database / Drizzle Rules

Use PostgreSQL and Drizzle ORM.

Schema changes are schema-first and migration-backed.

Workflow:

1. change Drizzle schema
2. generate migration
3. review SQL
4. test migration locally
5. commit schema and migration together
6. verify in preview/staging before production

Use:

```bash
npm run db:generate
npm run db:migrate
```

Never rely on untracked/manual production schema edits.

## Data integrity

Preserve requirements such as:

- unique public slugs
- unique `(userId, recommendationId)` Favorite relationship
- only published Recommendations appear publicly
- only active Product Links resolve through tracked redirects
- disabling a Product Link must not destroy historical analytics

Avoid hard-deleting data when deletion would break required history.

---

# 12. Recommendation Publishing Rules

A normal published Recommendation should satisfy the documented publish validation.

Expected baseline includes:

- valid Product
- unique Recommendation slug
- headline
- summary
- valid media
- publishable status
- active external Product Link unless intentionally approved as informational-only

Admin preview must not accidentally make draft content publicly discoverable.

Published/archived state transitions must preserve history.

---

# 13. Authentication and RBAC

Better Auth is the current authentication foundation.

The final provider mix (`AUTH-01`) is not locked yet.

Possible launch providers include:

- Google OAuth
- Email
- Mobile OTP

Do not bake provider-specific assumptions into domain logic.

## Authorization

- Admin authorization must be enforced server-side
- UI visibility is not authorization
- route middleware can improve UX but does not replace server/domain checks
- suspended/disabled users cannot perform protected actions
- never trust client-provided roles

---

# 14. Favorites

Favorites save a `Recommendation`.

Expected behaviour:

- authenticated users can save/unsave
- duplicate Save does not create duplicate records
- Guest Save begins authentication flow
- successful Guest Save continuation creates the Favorite exactly once
- cancelled/failed auth must not create a Favorite
- UI state must eventually reconcile with server truth

---

# 15. Marketplace / Product Link Rules

A Product can have multiple external marketplace/store links.

A Product Link may include:

- marketplace
- destination URL
- optional affiliate URL
- optional reference price
- currency
- primary flag
- status
- stable redirect code

A link can be disabled/replaced without deleting the Product or Recommendation.

Reference price is informational only and may differ from the live marketplace price.

Do not imply GoodStash controls external price/stock.

---

# 16. Tracked Redirect Rules

The tracked redirect path is a critical commercial-intent path.

Use the documented internal pattern:

```text
/go/[code]
```

Expected behaviour:

1. resolve internal code
2. load Product Link
3. validate link status
4. determine approved external destination
5. record qualified `outbound_click`
6. redirect externally

Security requirements:

- never accept an arbitrary external URL query parameter and blindly redirect
- prevent open redirects
- reject invalid/inactive links safely
- do not expose secret credentials in logs
- tracking failure should normally not block a valid safe redirect unless integrity/security requires it
- keep redirect latency low

Do not treat prefetch/bot traffic as genuine commercial intent where it can reasonably be identified.

---

# 17. Search Rules

Phase 1 search uses PostgreSQL unless documentation changes.

Search public published content across relevant:

- Product name
- Brand
- Category
- Tag
- Recommendation content

Rules:

- drafts/archived content must never leak into public search
- no-result state is a real product state, not an error
- do not fill no-result pages with unrelated fake matches
- prefer strong title/brand matches
- use PostgreSQL full-text/trigram capabilities when appropriate

Do not introduce Elasticsearch/Algolia/Meilisearch unless actual requirements justify it.

---

# 18. Media Rules

Production media uses object storage, not local filesystem storage.

Expected principles:

- validate upload type/size
- authorise upload server-side
- record media metadata only after successful upload
- preserve alt text
- serve optimised image sizes
- handle removed/in-use media safely
- do not expose private credentials/signing secrets

Do not build unnecessary advanced media pipelines before the current story requires them.

---

# 19. Analytics Rules

Canonical Phase 1 business events include:

```text
recommendation_view
favorite_attempt
favorite_saved
favorite_removed
outbound_click
search_submitted
category_view
auth_started
auth_completed
```

Keep event names/semantics stable.

Important:

- views and clicks need documented qualification rules
- bots/prefetch should not inflate intent metrics where avoidable
- do not infer purchases
- archiving/disabling content must not erase historical analytics

---

# 20. API / Route Handler Rules

Validate input at every trust boundary.

Use Zod or approved schema validators.

Route handlers should:

- authenticate when required
- authorise business action
- validate input
- call domain/service layer
- map typed errors to safe HTTP responses

Do not:

- return raw database errors
- expose stack traces to users
- trust arbitrary IDs/roles from the request body
- duplicate domain logic in multiple handlers

Server Actions may be used for same-origin form commands where appropriate, but domain rules must remain reusable.

---

# 21. Error Handling

Use consistent typed error categories.

Recommended conceptual categories:

```text
VALIDATION_ERROR
UNAUTHENTICATED
FORBIDDEN
NOT_FOUND
CONFLICT
UNAVAILABLE
RATE_LIMITED
INTERNAL_ERROR
```

Exact implementation names may differ.

User-visible errors must:

- be actionable where possible
- avoid raw infrastructure/provider details
- preserve safe recovery paths

Log enough internal context for debugging without logging secrets.

---

# 22. UI / Design Rules

Follow:

```text
docs/05-design-system.md
```

Core palette:

```text
Coral   #FF6846
Mint    #9BE7C4
Cream   #FFF9F2
Ink     #22201E
```

The product should feel:

- warm
- curated
- useful
- trustworthy
- lifestyle-oriented

Avoid marketplace-style visual pressure.

Do not add:

- flash-sale countdowns
- excessive vouchers
- fake scarcity
- misleading "Buy Now" language when navigation is external

Marketplace CTA wording should make the external destination clear, for example:

```text
Check on Shopee
View on Lazada
```

---

# 23. Responsive / Accessibility Rules

Mobile is the reference consumer experience.

Required considerations:

- touch targets should be comfortably usable
- primary flows cannot depend on hover
- desktop should use additional width intelligently, not stretch mobile layouts
- keyboard/focus behaviour matters on desktop
- semantic labels required for forms
- meaningful image alt text required
- do not communicate state using color alone
- target practical WCAG AA contrast

Every P0 UI story should consider:

- loading
- empty
- error
- auth/permission
- mobile
- desktop

---

# 24. Testing Rules

Changes to business behaviour should include appropriate automated tests.

## Unit tests

Use for:

- validation rules
- state transitions
- helper/domain logic
- slug/redirect helpers

## Integration tests

Use for:

- database constraints
- Favorites idempotency
- publish validation
- Admin authorization
- redirect resolution/event persistence

## E2E

Critical Phase 1 flows should eventually cover:

1. Admin draft → publish → public Recommendation
2. Guest Save → auth → saved
3. User opens My Stash
4. tracked `/go` redirect
5. search results/no-results
6. non-Admin cannot perform Admin operations

Use deterministic non-sensitive test data.

---

# 25. Required Quality Commands

Before treating a coding task as complete, run the repository equivalents of:

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

Fix failures before marking the task complete.

Do not suppress failing checks just to make CI green.

---

# 26. Git / Pull Request Expectations

Prefer small, focused PRs tied to backlog stories.

Preferred commit prefixes:

```text
feat:
fix:
refactor:
test:
docs:
chore:
```

PR summary should include:

- Story / Requirement IDs
- what changed
- tests run
- migration/data impact
- UI screenshots when visual
- security/privacy implications where relevant
- deviations from `/docs`
- unresolved blockers/open decisions

Do not start the next sprint simply because code compiles. Respect sprint exit criteria in `docs/07-development-backlog.md`.

---

# 27. Definition of Done

A change is Done only when relevant criteria are satisfied:

- requested acceptance criteria pass
- lint passes
- typecheck passes
- tests pass
- production build passes
- new business behaviour has tests
- migrations are included/reviewed where needed
- loading/empty/error states are covered
- responsive behaviour is verified where relevant
- accessibility basics are considered
- analytics are added where specified
- no secrets/debug-only artifacts are committed
- documentation is updated if a contract changed

---

# 28. Sprint Discipline

Current high-level sequence:

```text
S0 — Engineering Foundation
S1 — Content Core + Admin CMS
S2 — Consumer Discovery
S3 — Authentication + Favorites
S4 — Marketplace Redirect + Analytics
S5 — Search + SEO + QA + Launch
```

Only implement the active sprint/story unless explicitly instructed otherwise.

Do not "helpfully" jump ahead into later features.

---

# 29. Sprint 0 Rules

During Sprint 0:

- build engineering foundation only
- route handlers/pages may be shells
- avoid fake business logic
- establish CI, DB, env, auth foundation and conventions
- prove the repository can install, lint, typecheck, test and build

Sprint 0 does **not** mean implementing the finished Product/Recommendation CMS.

---

# 30. First Vertical Slice After Sprint 0

Sprint 1's primary proof is:

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

Core Sprint 1 domains:

- Brand
- Product
- Recommendation
- Category
- Tag
- Marketplace
- Product Link
- Media

Implement this slice before unrelated enhancements.

---

# 31. Current Open Decisions

Do not silently finalise these decisions:

## BRAND-01

```text
GoodStash vs GoodStuff
```

Working value: `GoodStash`.

## AUTH-01

Launch authentication provider combination.

Possible options:

- Google OAuth
- Email
- Mobile OTP

Other provider-level decisions may remain open until their sprint:

- production PostgreSQL provider
- S3-compatible storage provider
- error monitoring provider
- rate-limiting provider/implementation

Design code so these can be resolved without large rewrites.

---

# 32. Behaviour When Requirements Are Missing

If the requested work is not defined clearly enough:

1. check `/docs`
2. check the current backlog Story
3. use existing architecture/patterns
4. implement only the minimum behaviour that is clearly required

If a product decision is still genuinely ambiguous, **ask/report the ambiguity instead of inventing product scope**.

Do not use personal preference to create new business behaviour.

---

# 33. Before Finishing Any Copilot Task

Before reporting completion:

1. verify the correct Story/Requirement IDs
2. review changed files for scope creep
3. run required quality commands
4. verify migration impact
5. confirm no secret was added
6. update tests
7. update docs if a contract changed
8. explicitly report anything that could not be completed

The completion summary should state:

- implemented Story/Requirement IDs
- key files/modules changed
- tests/checks executed
- database/migration impact
- deviations from documentation
- remaining blockers/open decisions

---

# Final Rule

Build **the documented product**, not a generic ecommerce application and not a speculative social platform.

When in doubt:

> **Curated discovery first. External commerce second. Community later.**
