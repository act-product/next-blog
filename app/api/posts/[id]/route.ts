import { NextResponse } from 'next/server';
import { addPost } from '../../../actions/addPost';
import { getPostById } from '../../../actions/getPostById';
import prisma from '../../../lib/prisma';

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

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const post = await prisma.post.findUnique({
        where: { id: parseInt(id, 10) },
    });

    if (!post) {
        return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
    }

    return NextResponse.json(post);
}