import prisma from '../lib/prisma';

interface Post {
    id: number;
}

export async function getPostById(id: number) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: id, },
        });
        console.log('Post fetched by ID:', post);
        if (post) {
            return post;
        }
        return null;
    } catch (error) {
        console.error('IDからの記事取得に失敗しました', error);
        throw new Error('IDから記事を取得できません');
    }
}