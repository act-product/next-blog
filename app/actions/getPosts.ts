import prisma from '../lib/prisma';

export async function getPosts() {
    try {
        // 投稿日時が新しい順で記事を取得
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc', // 'desc' は降順を意味します
            },
        });

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Unable to fetch posts');
    }
}
