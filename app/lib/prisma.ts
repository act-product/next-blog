import { PrismaClient } from '@prisma/client';

// PrismaClient のインスタンスを作成
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

// PrismaClient のインスタンスをエクスポート
export default prisma;
