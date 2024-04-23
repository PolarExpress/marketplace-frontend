# syntax=docker/dockerfile:1

FROM node:21-bullseye as base

# --------------------------------------

FROM    base AS deps
WORKDIR /deps/dev
COPY    package.json ./
RUN     npm install

# --------------------------------------

FROM    base AS build
WORKDIR /app
COPY    --from=deps /deps/dev/node_modules ./node_modules
COPY    . .

ENV     NODE_ENV production
RUN     npm run build

# --------------------------------------

FROM    base AS prepare
WORKDIR /app
RUN     npm install -g serve

# --------------------------------------

FROM prepare AS deploy
COPY --from=build /app/dist /app/dist
ENV  NODE_ENV production

CMD ["serve", "-s", "dist", "-l", "4201"]
