# 01 — Product Overview

## Product definition

GoodStash / GoodStuff is a **curated product discovery and recommendation platform**.

The platform sits before the ecommerce transaction:

> Discover → Understand → Save → Visit Store

The platform helps users discover useful products through curated recommendation content, save items they care about, and leave the platform through tracked external links to marketplaces such as Shopee, Lazada, Taobao, TikTok Shop or official stores.

The platform does **not** own checkout, payment, order fulfilment or affiliate payout in Phase 1.

## Phase 1 positioning

Phase 1 is an **owner-curated product discovery platform**.

Only the Product Owner/Admin may create and publish recommendations.

### Guest
- browse Home, Discover, category and Search
- open recommendation detail
- click external marketplace links
- must authenticate to save

### Registered user
- everything a Guest can do
- save/unsave recommendations
- access My Stash/Favorites
- manage basic account settings

### Admin / Product Owner
- manage canonical Products
- create/edit/publish/archive Recommendations
- manage Brands, Categories and Tags
- manage Media
- manage Marketplaces and product links
- feature/order content
- view analytics

## Core product distinction

A **Product** and a **Recommendation** are different domain objects.

- **Product:** the canonical real-world item
- **Recommendation:** editorial content explaining why that product is worth attention

This is a non-negotiable architecture rule. A Product may have multiple Recommendations in later phases.

## Why the product exists

Large ecommerce platforms are optimised for catalogue breadth and transactions. Users often face:
- too many similar listings
- duplicated products
- inconsistent or noisy reviews
- time-consuming comparison
- difficulty deciding what is actually worth buying

GoodStash reduces that discovery friction through controlled curation and recommendation context.

## Value proposition

### For users
- discover fewer, better-selected products
- understand why an item is recommended
- save items for later
- reach familiar marketplaces quickly

### For the Product Owner
- learn what users view
- learn what users save
- measure outbound purchase intent
- identify high-performing categories/content
- build a structured content asset that can later support community publishing

## Working brand

Both names remain active:
- **GoodStash**
- **GoodStuff**

Until final naming is chosen:
- use GoodStash as the working wordmark
- keep the brand name configurable
- do not hard-code `GoodStash` throughout domain logic
- retain the GoodStash visual identity for either final name

### Brand personality
Warm · Friendly · Curated · Useful · Lifestyle-oriented · Trustworthy

### Core visual palette
- Coral `#FF6846`
- Mint `#9BE7C4`
- Cream `#FFF9F2`
- Ink `#22201E`

## Phase roadmap

### Phase 1 — Curated
Admin publishes; users discover, save and click out.

### Phase 1.1 — Better discovery
Potential additions:
- curated Collections
- related recommendations
- recently viewed
- improved discovery modules

### Phase 2 — User contribution
Registered users may publish recommendations. The Product/Recommendation separation enables this without duplicating canonical product identity.

### Phase 3 — Community
Possible:
- creator profiles
- following feed
- likes/comments
- public collections
- creator analytics

### Phase 4 — Monetisation ecosystem
Possible:
- platform-managed affiliate relationships
- creator affiliate attribution
- revenue sharing
- brand collaborations
- sponsored recommendations
- payouts

These later phases are context only. **Do not implement them inside Phase 1.**

## Phase 1 success funnel

Primary behavioural funnel:

> Visitor → Recommendation View → Favorite → Outbound Click

Key success signals:
- recommendation views
- favorite rate
- outbound click-through rate
- returning users
- recommendations viewed per session
- category/search demand

Revenue is not the only or primary early validation metric.

## Delivery strategy

- web/PWA first
- mobile-first consumer UX
- responsive desktop consumer UX
- operational Admin CMS
- native apps later only if usage validates the need
