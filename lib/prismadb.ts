import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

console.log({ prisma: !!globalThis.prisma });
const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

export default prisma