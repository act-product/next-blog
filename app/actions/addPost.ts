'use server';

import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function addPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const image = formData.get('image') as File | null;

    if (!title || !content) {
        throw new Error('タイトルと内容が必要です');
    }

    let imagePath = '';

    // 画像の保存処理
    if (image) {
        const imageDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
        }

        const imageName = `${uuidv4()}-${image.name}`;
        imagePath = path.join('/uploads', imageName);
        const localImagePath = path.join(imageDir, imageName);

        const fileData = await image.arrayBuffer();
        fs.writeFileSync(localImagePath, Buffer.from(fileData));
    }

    // 新しい記事の作成
    const post = await prisma.post.create({
        data: {
            title,
            content,
            thumbnail: imagePath || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    return post;
}
