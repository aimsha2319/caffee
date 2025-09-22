FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/ui/package.json packages/ui/
RUN npm install -g pnpm@8.15.4
RUN pnpm install --filter web...
COPY . .
RUN pnpm --filter web build

FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/apps/web/.next ./.next
COPY --from=deps /app/apps/web/public ./public
COPY --from=deps /app/apps/web/package.json ./package.json
RUN npm install -g pnpm@8.15.4 && pnpm install --prod
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start"]
