import { PrismaClient } from "@prisma/client";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPostgresAdapter({
      connectionString: process.env["DATABASE_URL"]!,
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
