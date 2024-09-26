import { NextResponse } from 'next/server';
import { addPost } from '../../actions/addPost';
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const image = formData.get('image') as File | null;

    try {
        const post = await addPost({ title, content, image });
        return NextResponse.json(post);
    } catch (error) {
        console.error('エラー：', error);
        return NextResponse.json({ error: '投稿に失敗しました' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('エラー：', error);
        return NextResponse.json({ error: '記事の取得に失敗しました' }, { status: 500 });
    }
}

