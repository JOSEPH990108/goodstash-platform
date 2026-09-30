# GoodStash Repository Instructions

Treat `/docs` as the product and engineering source of truth. Before meaningful work, read `docs/README.md` and the relevant business, product, architecture, backlog, and implementation documents. Resolve conflicts explicitly instead of inventing product decisions.

Implement only the story assigned to the active sprint. Do not start later-sprint behavior or Phase 2 scope without explicit approval. Follow `AGENTS.md` for Next.js-specific guidance.

Repository-wide rules:

- Phase 1 is owner-curated only; do not add community or user-generated publishing scope.
- Product is the canonical real-world product. Recommendation is separate editorial content and references Product.
- Favorites target Recommendations only.
- Marketplace destinations belong to ProductLinks, not Products.
- Commerce remains external; an outbound click is not a purchase.
- Keep business logic outside route/UI layers and enforce authorization server-side.
- Validate untrusted input at trust boundaries with Zod or an equivalent typed validator.
- Keep `NEXT_PUBLIC_BRAND_NAME` configurable for GoodStash/GoodStuff through the central brand layer.
- Schema changes require reviewed, forward-safe Drizzle migrations and tests for changed behavior.
- Keep secrets out of source, logs, client bundles, and user-visible errors.
- Do not introduce Phase 2 scope or unrelated future-sprint behavior.

Before completion, run:

```text
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

Keep changes scoped to the active story and update `/docs` when a contract or delivery dependency changes.
