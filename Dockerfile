# Technieum portal — self-host image (works on ARM64, e.g. NVIDIA DGX Spark).
# Build on the target host: docker compose build   (or: docker build -t technieum .)

# ---- dependencies ------------------------------------------------------------
FROM node:20-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
# Copy the Prisma schema BEFORE npm ci — the package's postinstall runs
# `prisma generate`, which needs prisma/schema.prisma to exist.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# ---- build -------------------------------------------------------------------
FROM node:20-bookworm-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* is baked at build time. Default on so the in-app lab runner shows.
ARG NEXT_PUBLIC_LABS_DOCKER=1
ENV NEXT_PUBLIC_LABS_DOCKER=${NEXT_PUBLIC_LABS_DOCKER}
RUN npm run build

# ---- runtime -----------------------------------------------------------------
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# docker CLI (talks to the host's mounted socket to spin up lab containers) + openssl for Prisma.
# Use Docker's official docker-ce-cli, not Debian's old docker.io — the bundled
# one (API 1.41) is too old for modern daemons (need >= 1.44).
# git + the buildx plugin let the lab runner `docker build <github-url>` for labs
# that ship a Dockerfile but no published image (built once, then cached).
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl gnupg openssl git && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian bookworm stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && apt-get install -y --no-install-recommends docker-ce-cli docker-buildx-plugin && \
    rm -rf /var/lib/apt/lists/*

# Next standalone server + static assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# Full node_modules + prisma schema so the Prisma engine, tesseract.js, and the
# Prisma CLI (for `prisma db push`) are all present at runtime.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/scripts ./scripts

EXPOSE 3000
CMD ["node", "server.js"]
