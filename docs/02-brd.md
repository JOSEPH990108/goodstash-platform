# 02 — Business Requirements Document (BRD)

## Business objectives

| ID | Objective | Expected outcome |
|---|---|---|
| BO-001 | Validate product discovery demand | Confirm users browse curated recommendations instead of only going directly to marketplaces |
| BO-002 | Validate recommendation quality | Determine whether content drives saves, repeat visits and outbound clicks |
| BO-003 | Build a reusable content asset | Maintain structured Products and Recommendations for future expansion |
| BO-004 | Establish measurable purchase intent | Measure outbound marketplace clicks without owning checkout |
| BO-005 | Create a scalable brand foundation | Support GoodStash/GoodStuff while keeping one reusable visual system |
| BO-006 | Reduce MVP complexity | Avoid payments, logistics, payouts and UGC until core behaviour is validated |

## Phase 1 scope

### In scope
- public recommendation browsing
- Home and Discover
- category discovery
- Search
- recommendation detail
- registered-user Favorites/My Stash
- user account basics
- multiple external marketplace links per Product
- tracked outbound redirects
- Admin CMS
- Products, Recommendations, Brands, Categories, Tags
- media management
- Admin analytics
- SEO-friendly public URLs
- responsive mobile-first web

### Out of scope
- registered-user publishing
- creator profiles
- follow/comments/public likes/chat
- cart/checkout/payment
- order/shipping/fulfilment
- commission ledger/payout/wallet
- cashback/points
- native applications
- AI recommendation engine
- sponsored creator marketplace

## Business requirements

| ID | Pri | Requirement |
|---|---|---|
| BR-001 | MUST | Only authorised Admin/Product Owner roles publish Phase 1 recommendation content |
| BR-002 | MUST | Public recommendations are browsable without account creation |
| BR-003 | MUST | Discovery supports category, tags, Product name, Brand and recommendation text |
| BR-004 | MUST | Registered users can save/remove recommendations from a personal Favorites area |
| BR-005 | MUST | Purchases complete on third-party marketplaces, not inside GoodStash |
| BR-006 | MUST | Marketplace clicks pass through a trackable internal redirect |
| BR-007 | MUST | A Product can have one or more external marketplace/store links |
| BR-008 | MUST | Admin CMS manages content, taxonomy, media and links |
| BR-009 | MUST | Admin analytics expose views, favorites and outbound clicks |
| BR-010 | SHOULD | Curated Collections are supported as a planned v1.1 capability |
| BR-011 | SHOULD | Public pages support SEO and meaningful share previews |
| BR-012 | SHOULD | Core model remains ready for multiple recommenders per Product later |
| BR-013 | COULD | Recently viewed may be added post-MVP |
| BR-014 | COULD | Notification opt-in may be added post-MVP |

## Functional domains

| ID | Domain | Requirement |
|---|---|---|
| FR-AUTH-001 | Authentication | Register/sign in/sign out/recover using approved provider(s) |
| FR-USER-001 | User | View/update basic account details |
| FR-FAV-001 | Favorites | Save/unsave a Recommendation |
| FR-FAV-002 | Favorites | View personal saved Recommendations |
| FR-DISC-001 | Discovery | Featured/latest/popular/category content |
| FR-SRCH-001 | Search | Product, Brand, Category, Tag and published recommendation text |
| FR-PROD-001 | Product | Reusable canonical product identity |
| FR-RECO-001 | Recommendation | Recommendation content separate from Product |
| FR-LINK-001 | Marketplace | Multiple destination links with optional reference price |
| FR-REDIR-001 | Redirect | Resolve internal code, record event, redirect externally |
| FR-ADMIN-001 | Admin | Draft, preview, publish, archive and manage content |
| FR-ANLT-001 | Analytics | Aggregate/item-level performance metrics |
| FR-MEDIA-001 | Media | Upload/manage images and videos |

## Business rules

| ID | Rule |
|---|---|
| RULE-001 | Only authorised Admin roles can publish/unpublish in Phase 1 |
| RULE-002 | Guests may browse and click outbound links; saving requires authentication |
| RULE-003 | Product and Recommendation are separate business objects |
| RULE-004 | Draft Products may have zero links; published recommendation normally requires at least one active destination unless intentionally informational |
| RULE-005 | Dead/inactive links can be disabled without deleting Product or Recommendation |
| RULE-006 | External links may contain affiliate parameters; attribution/payout remains external |
| RULE-007 | Record outbound intent before redirect where feasible without noticeable delay |
| RULE-008 | Recommendation states: Draft, Published, Archived; link states include Active and Inactive |
| RULE-009 | Manual/editorial featuring must not be presented as algorithmic popularity |
| RULE-010 | Do not expose earnings, commissions, orders or purchase history the platform does not own |

## Business data requirements

Minimum domains:
- User
- Product
- Recommendation
- Brand
- Category
- Tag
- Marketplace
- Product Link
- Favorite
- Media
- View events
- Click events
- Search events

Collections are a planned post-MVP domain unless promoted into v1.0.

## Analytics requirements

| ID | Metric |
|---|---|
| AN-001 | Recommendation views |
| AN-002 | Favorite count / favorite rate |
| AN-003 | Outbound clicks |
| AN-004 | Outbound CTR |
| AN-005 | Marketplace distribution |
| AN-006 | Search terms and no-result demand |
| AN-007 | Category performance |
| AN-008 | Returning users |
| AN-009 | Recommendations viewed per session |

Never infer a completed purchase from an outbound click.

## Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-001 | Performance | Fast mobile-first pages; image optimisation/caching/lazy loading |
| NFR-002 | Availability | Discovery and redirect paths are operationally resilient |
| NFR-003 | Security | Secure auth, role-based Admin access, protected write endpoints |
| NFR-004 | Privacy | Collect only needed user/analytics data |
| NFR-005 | SEO | Crawlable public URLs, metadata, canonical URLs and social previews |
| NFR-006 | Accessibility | Practical WCAG-oriented browsing/forms/save actions |
| NFR-007 | Extensibility | Future UGC must not require merging Product and Recommendation |
| NFR-008 | Observability | Redirect/publishing/render failures must be traceable |
| NFR-009 | Responsive | Primary flows work from mobile through desktop |

## Phase 1 release success criteria

Phase 1 is business-complete when:
- an Admin can create and publish curated recommendation content without engineering assistance
- Guests can discover and read published recommendations
- Registered users can save and revisit recommendations
- external marketplace links are reliable and measurable
- core views/favorites/click metrics are available
- no out-of-scope commerce or social feature has accidentally entered MVP

## Current open decisions

- `BRAND-01`: GoodStash vs GoodStuff
- `AUTH-01`: launch authentication provider mix
- exact launch taxonomy
- launch seed content volume
- whether Collections remains Phase 1.1
