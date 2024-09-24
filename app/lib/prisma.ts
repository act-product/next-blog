import { PrismaClient } from '@prisma/client';

// PrismaClient のインスタンスを作成
const prisma = new PrismaClient();

// PrismaClient のインスタンスをエクスポート
export default prisma;
