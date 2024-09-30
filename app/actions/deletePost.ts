'use server';

import prisma from '../lib/prisma';

export async function deletePost(id: number) {
    try {
        await prisma.post.delete({
            where: { id: Number(id) },
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return { success: false, error: '削除に失敗しました' };
    }
}