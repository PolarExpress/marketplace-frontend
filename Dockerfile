# syntax=docker/dockerfile:1

FROM node:21-bookworm AS base
RUN  npm install -g vite
RUN  npm install -g typescript

# --------------------------------------

FROM base AS deps

WORKDIR /deps/dev
COPY package.json ./
RUN npm install

# --------------------------------------

FROM    base AS build
WORKDIR /app
COPY    --from=deps /deps/dev/node_modules ./node_modules
COPY    . .
# ?
ENV     NODE_ENV production
RUN     npm run build

# --------------------------------------

FROM node:21-alpine AS prepare
WORKDIR /app
RUN npm install -g serve

# --------------------------------------

FROM prepare AS deploy
COPY --from=build /app/dist /app/dist

CMD ["serve", "-s", "dist", "-l", "3000"]