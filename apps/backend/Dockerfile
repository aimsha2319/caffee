FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/
COPY packages/types/package.json packages/types/
COPY packages/ui/package.json packages/ui/
RUN npm install -g pnpm@8.15.4
RUN pnpm install --filter backend...
COPY . .
RUN pnpm --filter backend build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/apps/backend/dist ./dist
COPY --from=base /app/apps/backend/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
