import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type AddPostInput = {
    title: string;
    content: string;
    image?: File;
};

export async function addPost({ title, content, image }: AddPostInput) {
    if (!title || !content) {
        throw new Error('タイトルと内容が必要です');
    }

    let imagePath = '';

    //画像の保存処理
    if (image) {
        const imageDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
        }

        //ファイル名をUUIDで生成
        const imageName = `${uuidv4()}-${image.name}`;
        imagePath = path.join('/uploads', imageName);
        const localImagePath = path.join(imageDir, imageName);

        //画像をローカルに保存
        const fileData = await image.arrayBuffer();
        fs.writeFileSync(localImagePath, Buffer.from(fileData));
    }

    //新しい記事の作成
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