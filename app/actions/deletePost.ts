'use server';

import prisma from '../lib/prisma';

export async function deletePost(postId: number) {
    try {
        await prisma.post.delete({
            where: { id: postId },
        });
        return { success: true };
    } catch (error) {
        console.error('記事削除に失敗しました:', error);
        throw new Error('記事の削除に失敗しました');
    }
}