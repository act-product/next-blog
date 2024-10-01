'use server';

import prisma from '../lib/prisma';
import path from 'path';
import fs from 'fs/promises';

export async function editPost(id: number, formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const thumbnailFile = formData.get('thumbnail') as File | null;

    try {
        let thumbnailPath = null;

        // サムネイル画像がある場合
        if (thumbnailFile) {
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            const filePath = path.join(uploadsDir, thumbnailFile.name);

            // ディレクトリが存在しない場合は作成
            await fs.mkdir(uploadsDir, { recursive: true });

            // ファイルを保存
            const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            // サムネイルパスを設定
            thumbnailPath = `/uploads/${thumbnailFile.name}`;
        }

        // Prismaで記事を更新
        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
                ...(thumbnailPath && { thumbnail: thumbnailPath }), // サムネイルがある場合のみ更新
            },
        });

        return {
            success: true,
            post: updatedPost,
        };
    } catch (error) {
        console.error('Error updating post:', error);
        return { success: false, error: 'Failed to update post' };
    }
}
