'use server';

import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function editPost(id: number, title: string, content: string, image?: File | null) {
    if (!title || !content) {
        throw new Error('タイトルと内容が必要です');
    }

    let imagePath = '';

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

    //記事の更新
    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            thumbnail: imagePath || null,
            updatedAt: new Date(),
        },
    });

    return updatedPost;
}