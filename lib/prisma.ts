import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não foi definida.");
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// O Prisma CLI resolve URLs SQLite relativas a partir de `prisma/`, enquanto o
// adaptador roda na raiz da aplicação. Assim ambos usam `prisma/data/dev.db`.
const adapterUrl = databaseUrl.startsWith("file:./")
  ? `file:./prisma/${databaseUrl.slice("file:./".length)}`
  : databaseUrl;

const adapter = new PrismaBetterSqlite3({ url: adapterUrl });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
