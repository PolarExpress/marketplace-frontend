# syntax=docker/dockerfile:1

FROM node:21-bullseye as base
COPY package.json ./
RUN  corepack enable

# --------------------------------------

FROM    base AS deps
WORKDIR /deps/dev
COPY    package.json pnpm-lock.yaml ./
RUN     pnpm install --frozen-lockfile

# --------------------------------------

FROM    base AS build
WORKDIR /app
COPY    --from=deps /deps/dev/node_modules ./node_modules
COPY    . .
COPY    .env.production .

ENV     NODE_ENV production
RUN     pnpm run build

# --------------------------------------

FROM    base AS deploy
WORKDIR /app
COPY    --from=build /app/dist /app/dist
ENV     NODE_ENV production

CMD ["pnpm", "dlx", "serve", "-s", "dist", "-l", "4201"]
