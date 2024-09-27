import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('エラー：', error);
        return NextResponse.json({ error: '記事の取得に失敗しました' }, { status: 500 });
    }
}

