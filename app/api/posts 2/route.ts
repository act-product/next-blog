import { NextResponse } from 'next/server';
import { addPost } from '../../actions/addPost';
import prisma from '../../lib/prisma'; // prismaのインポートパスは適宜修正してください

// 型定義
interface PostData {
    title: string;
    content: string;
    thumbnail?: string;
}

// 記事一覧を取得するGETリクエストの処理
export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}

// 記事を作成するPOSTリクエストの処理
export async function POST(req: Request) {
    try {
        const body: PostData = await req.json();
        const { title, content, thumbnail } = body;

        // Prismaを使って記事を作成
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                thumbnail,
            },
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}
