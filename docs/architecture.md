# <APP_NAME> architecture

## Overview

- **Backend**: NestJS GraphQL API with Prisma + PostgreSQL. Provides resolvers for discovery (places/feed), review creation with media tagging, list management, moderation workflow, notification fetch, and ranking administration.
- **Web**: Next.js 14 App Router client. Uses server components for data fetching, Apollo Provider for client mutations, and Tailwind-inspired styling with the shared UI kit.
- **Mobile**: Expo / React Native with Expo Router tabs mirroring primary navigation (Home, Search, Compose, Lists, Profile). Shares UI components and GraphQL schema with the web client.
- **Shared packages**: `@caffee/types` centralizes domain models, ranking defaults, and analytics events. `@caffee/ui` hosts cross-platform tokens + primitives. `@caffee/config` exposes lint/formatting baselines.

## Data flow

1. Clients authenticate (future: OAuth/Passkeys) and call the GraphQL API via Apollo.
2. Mutations (`createReview`, `createComment`, `createList`, `claimPlace`, `moderateReport`) persist via Prisma models with cascading relations.
3. Reviews trigger ranking recalculations via `RankingService`, which powers search ordering and admin adjustments.
4. Moderation queue fetches `Report` entities for human review; actions update status/resolution notes.
5. Notifications deliver digest-ready payloads; clients fetch via GraphQL query (push/email handled out-of-band).

## Analytics

`@caffee/types` lists canonical analytics events (search, filter, review flows, list interactions, owner actions). Instrument web/mobile clients by importing `AnalyticsEvents` and mapping to PostHog/Amplitude libraries.

## Search & ranking

- Initial search uses Prisma filters + placeholder geospatial queries. Extend with Meilisearch index (infra stub) for natural language + synonyms.
- `RankingService` offers tunable weights (quality, recency, trust, diversity, consistency, media). Admin dashboard displays current values and toggles (freeze on alerts, verified boost, no ad override).

## Moderation & safety

- `Report` entities queue flagged content. Moderation mutation updates status + notes.
- `Claim` model handles owner verification; owner replies flagged with `isOwner` boolean.
- Future: integrate ML services (toxicity, OCR) via worker queues (Redis/Cloudflare Queues) and escalate to human reviewers.

## Roadmap

- **MVP**: complete auth, polish GraphQL resolvers, integrate search index, add offline-first review drafts, finalize owner console updates.
- **V1**: trust score surfacing, influencer tooling, coffee module enrichment, analytics dashboards.
- **V2**: reservations & delivery integrations, receipt verification, monetized creator/owner tiers, advanced ranking audit logs.
