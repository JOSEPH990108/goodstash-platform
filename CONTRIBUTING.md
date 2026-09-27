# Contributing

## Prerequisites
- Node.js 22+
- npm 10+
- Docker (for local PostgreSQL)

## Setup
1. Copy `.env.example` to `.env` and adjust values as needed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local PostgreSQL:
   ```bash
   docker compose up -d postgres
   ```
4. Generate database migrations when schema changes:
   ```bash
   npm run db:generate
   ```

## Quality checks
Run before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

## Scope guardrails
- Keep Product and Recommendation as separate domains.
- Keep brand naming configurable via `NEXT_PUBLIC_BRAND_NAME`.
- Avoid implementing Phase 2 features during Sprint 0.
