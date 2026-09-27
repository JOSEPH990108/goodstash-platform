# 05 — Design System

## Direction

The product should feel:
- warm
- curated
- useful
- trustworthy
- lifestyle-oriented
- content-led rather than sales-led

It should **not** look like a traditional high-pressure ecommerce marketplace.

Avoid by default:
- flash-sale timers
- voucher clutter
- oversized discount badges
- aggressive countdowns
- dense marketplace-style grids
- visual patterns implying GoodStash is the seller

## Core design principles

| Principle | Implementation implication |
|---|---|
| Curated, not crowded | generous whitespace and controlled content density |
| Useful over hype | recommendation reasoning before aggressive commerce |
| Save-first habit | consistent save affordance across cards/detail |
| Marketplace-light | external destinations are explicit |
| Mobile-first | thumb-friendly navigation and CTA |
| Brand-name flexible | GoodStash → GoodStuff swap must not break layout |

## Color tokens

| Token | Value | Role |
|---|---|---|
| `--color-primary` | `#FF6846` | Coral — primary CTA, active state |
| `--color-secondary` | `#9BE7C4` | Mint — supporting accent |
| `--color-ink` | `#22201E` | Primary text |
| `--color-canvas` | `#FFF9F2` | Warm Cream app background |
| `--color-surface` | `#FFFFFF` | Cards/sheets/panels |
| `--color-border` | `#EDE5DD` | Borders/dividers |

Do not use color as the only signal for state.

## Typography

Preferred implementation:
- Latin/UI: Inter or comparable neutral modern sans
- CJK fallback: Noto Sans CJK / system CJK sans

Approximate hierarchy:
- Display/H1: 32–40px mobile, bold
- H2: 24–28px, bold
- Body: 16px
- Meta: 12–14px
- Button: 16px medium

Use fluid/responsive values where appropriate; do not hard-code a separate one-off font scale per screen.

## Spacing and shape

- spacing baseline: `4px`
- main increments: `8, 12, 16, 24, 32, 40, 48`
- mobile page gutter: `20–24px`
- card radius: `20–24px`
- primary button radius: `16–18px`
- minimum interactive target: `44px`

Implement these as reusable design tokens.

## Core components

### Primary Button
- Coral fill
- white text
- one dominant primary action per focused surface where practical

### Recommendation Card
Contains:
- product/recommendation image
- one concise badge at most
- concise title
- short recommendation context
- optional reference price
- marketplace hint
- save control

The card must not look like a raw affiliate-listing tile.

### Save control
- inactive: outlined heart/bookmark treatment
- saved: Coral active treatment
- state must also be accessible through semantics/ARIA, not color only

### Consumer navigation
Mobile:
- Home
- Discover
- Search
- Saved
- Me

Desktop:
- convert to persistent top/global navigation

### Marketplace CTA
Label the external destination explicitly:
- `Check on Shopee`
- `View on Lazada`
- equivalent destination-aware wording

Never label external navigation in a way that implies checkout happens inside GoodStash.

## P0 screen behaviour

### Home
- editorial hero
- curated sections
- category entry points
- avoid dense catalog feel

### Discover
- theme/category-led discovery
- mobile filters can use chips/sheet
- desktop filters may be persistent/visible

### Search
- default, results and no-results states
- keep Recommendation Card visual language

### Recommendation Detail
- recommendation content is primary
- marketplace action remains clear
- mobile may use sticky bottom CTA
- desktop may use a right-side purchase/options panel

### Auth continuation
- preserve guest Save intent
- user should understand why authentication is requested

### My Stash
- simple saved-item hub for Phase 1
- custom user Collections are not Phase 1.0

## Desktop rules

Desktop is **not** a stretched mobile screen.

Use additional width for:
- stronger browsing density
- visible filters
- persistent global navigation
- controlled 3–4 column grids
- side purchase panel where appropriate

Avoid paragraphs spanning the full viewport width.

## Admin design rules

Admin prioritises operational efficiency over decorative brand expression.

Use:
- dense but readable tables
- predictable filters
- text labels for statuses
- clear Draft/Published/Archived states
- prominent Preview/Publish actions
- draft autosave where practical
- explicit publish confirmation

## Responsive rules

- mobile is the reference experience
- product/recommendation grid: typically 2 columns mobile when readable; 3–4 desktop
- bottom navigation → top navigation on larger breakpoints
- state/query context survives auth/back navigation when practical
- primary actions cannot depend on hover

## Accessibility baseline

- target WCAG AA text contrast
- interactive targets >= 44px
- keyboard/focus support on desktop
- semantic form labels
- meaningful image alt text
- no state communicated by color alone
- loading and error states announced appropriately where practical

## Implementation rule

Do not hard-code the public brand name into every component.

Expose brand configuration, e.g.:

```ts
export const brand = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "GoodStash",
};
```

The final implementation may structure config differently; the important requirement is cheap GoodStash/GoodStuff wordmark replacement.
