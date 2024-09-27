import prisma from '../lib/prisma';

export async function getPostById(id: number) {
    try {
        return await prisma.post.findUnique({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error('IDからの記事取得に失敗しました', error);
        throw new Error('IDから記事を取得できません');
    }
}