# GoodStash / GoodStuff — Engineering Documentation

This folder is the repository-level source of truth for the Phase 1 product.

## Current status

- **Working product name:** GoodStash
- **Alternate retained name:** GoodStuff
- **Visual identity:** GoodStash direction
- **Product phase:** Phase 1 — owner-curated product discovery
- **Delivery model:** responsive web/PWA first
- **Commerce model:** discovery and tracked outbound referral only; no internal checkout
- **User publishing:** not available in Phase 1

## Documents

| File | Purpose |
|---|---|
| `01-product-overview.md` | Product vision, positioning, phases and non-negotiable scope |
| `02-brd.md` | Business objectives, requirements, rules and success criteria |
| `03-prd.md` | Implementable product behaviour and acceptance rules |
| `04-sitemap-user-flows.md` | Routes, navigation and end-to-end user flows |
| `05-design-system.md` | GoodStash visual tokens, component and responsive rules |
| `06-technical-architecture.md` | Architecture, data model, APIs, analytics and security |
| `07-development-backlog.md` | Epics, stories, priorities, dependencies and sprint sequence |
| `08-implementation-playbook.md` | Engineering workflow, migrations, testing, CI/CD and DoD |
| `09-sprint-0-external-verification.md` | Manual Preview/Staging verification checklist |

## Source-of-truth rules

Each document owns a different concern:

1. **Business scope:** `02-brd.md`
2. **Product behaviour:** `03-prd.md`
3. **Page/navigation behaviour:** `04-sitemap-user-flows.md`
4. **Visual/UI behaviour:** `05-design-system.md`
5. **Technical implementation constraints:** `06-technical-architecture.md`
6. **Delivery order:** `07-development-backlog.md`
7. **Engineering execution standards:** `08-implementation-playbook.md`

If two documents appear to conflict, do **not** silently choose one. Raise the conflict in the PR/issue and resolve it before implementation.

## Explicit Phase 1 exclusions

Do not implement any of the following unless the product owner explicitly changes scope:

- user-generated recommendations
- creator profiles
- follows, comments, public likes or messaging
- internal shopping cart or checkout
- payment gateway
- orders, shipping, fulfilment or returns
- affiliate commission calculation or creator payout
- wallet, cashback, loyalty points
- native iOS or Android apps
- advanced AI recommendation/personalisation
- inferred purchase history from outbound clicks

## Open decisions

These are intentionally not final yet:

- `BRAND-01`: public name — GoodStash vs GoodStuff
- `AUTH-01`: launch authentication providers
- launch category set and seed content volume
- whether Collections stays v1.1 or moves into v1.0
- monitoring/rate-limit provider choices before launch

Implement around these decisions without hard-coding assumptions that would make them expensive to change.
