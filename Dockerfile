FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# O Prisma 7 exige uma URL mesmo para gerar o client. Este arquivo só existe no build.
ENV DATABASE_URL="file:./data/build.db"
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# O Docker define HOSTNAME com o ID do container. Para o proxy do Coolify
# alcançar o Next.js, o servidor precisa escutar em todas as interfaces.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
# Prisma CLI e aplicação usam exatamente o mesmo arquivo no volume persistente.
ENV DATABASE_URL="file:/app/prisma/data/dev.db"
RUN apk add --no-cache openssl

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
