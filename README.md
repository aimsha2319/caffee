# <APP_NAME>

A modern, trust-first social reviews platform dedicated to restaurants and cafés. The monorepo includes web, mobile, and backend services with shared design tokens and types.

## Monorepo structure

```
apps/
  backend/   # NestJS GraphQL API + Prisma ORM
  web/       # Next.js 14 web client
  mobile/    # Expo (React Native) mobile app
packages/
  ui/        # Shared design system components + tokens
  types/     # Shared domain types & analytics constants
  config/    # ESLint/Prettier configuration
prisma/      # Database schema & migrations
scripts/     # Utility scripts (seed, etc.)
infra/       # Docker Compose & IaC stubs (tbd)
docs/        # Architecture and runbooks
```

## Getting started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Environment variables**

   Copy the template and update values as needed.

   ```bash
   cp .env.example .env
   ```

3. **Local services**

   Use Docker Compose to provision PostgreSQL, Redis, and Meilisearch.

   ```bash
   docker compose up -d
   ```

4. **Database migration & seed**

   ```bash
   pnpm --filter backend prisma migrate dev
   pnpm --filter backend seed
   ```

5. **Run the backend**

   ```bash
   pnpm dev:backend
   ```

6. **Run the web app**

   ```bash
   pnpm dev:web
   ```

7. **Run the mobile app (Expo)**

   ```bash
   pnpm dev:mobile
   ```

   Use the Expo Go client or Simulator to view the app. Ensure the backend URL in `EXPO_PUBLIC_GRAPHQL_ENDPOINT` is reachable from the device/emulator.

## Key features

- GraphQL API with resolvers for places, reviews, lists, moderation, notifications, and ranking controls.
- Prisma schema capturing structured review models (multi-aspect ratings, menu-item tagging, trust metrics).
- Seed script populating demo users, 20 places, menu items, reviews, comments, and moderation reports.
- Next.js 14 web client with routes for feed, search/map (placeholder), place details, compose, lists, owner console, and admin dashboard.
- Expo mobile app with tabs mirroring core flows (feed, discovery, compose, lists, profile) and shared UI kit.
- Shared design system exporting Material 3 / iOS inspired tokens and React Native compatible components.
- Ranking service with admin toggles, moderation queue UI, and signed upload mutation stub.

## Testing & linting

- `pnpm lint` – run ESLint across packages.
- `pnpm test` – placeholder (add Jest/RTL/Detox suites over time).
- Backend includes Jest configuration; add specs under `apps/backend/src/**/*.spec.ts`.

## Deployment notes

- Containerize services with Docker (Dockerfiles included under `apps/*/Dockerfile` soon).
- Use GitHub Actions (workflow stub in `.github/workflows/ci.yml`) for CI (tests, lint, type-check).
- Infra folder reserved for Terraform modules (database, CDN, storage, queues).

## Documentation

See [`docs/architecture.md`](docs/architecture.md) for system architecture, data flow, analytics events, and roadmap.
