'use server';

import { NextResponse } from 'next/server';
import prisma from '../lib/prisma';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

// formidableの設定
export const config = {
    api: {
        bodyParser: false, // 自動的なボディパーサーを無効化
    },
};

export async function editPost(req: Request) {
    const form = formidable({ multiples: false });

    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            const { id, title, content } = fields;
            const thumbnail = files.thumbnail[0];

            try {
                // 画像を保存
                const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
                const filePath = path.join(uploadsDir, thumbnail.originalFilename);

                // uploadsディレクトリが存在しない場合は作成
                await fs.mkdir(uploadsDir, { recursive: true });

                // 画像を一時ファイルから指定したパスにコピー
                await fs.rename(thumbnail.filepath, filePath);

                // 記事を更新
                const updatedPost = await prisma.post.update({
                    where: { id: Number(id) },
                    data: {
                        title,
                        content,
                        thumbnail: `/uploads/${thumbnail.originalFilename}`,
                    },
                });

                resolve(NextResponse.json(updatedPost));
            } catch (error) {
                console.error('Error updating post:', error);
                reject(NextResponse.error());
            }
        });
    });
}
