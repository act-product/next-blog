// 'use server';

// import prisma from "../lib/prisma";

// interface EditPostParams {
//     id: string;
//     title: string;
//     content: string;
//     thumbnail?: string;
// }

// export const editPost = async ({ id, title, content, thumbnail }: EditPostParams) => {
//     console.log({ id, title, content, thumbnail }); // パラメータの確認用ログ

//     // 入力が不足している場合はエラーを投げる
//     if (!id || !title || !content) {
//         throw new Error("ID、タイトル、または内容が不足しています");
//     }

//     // IDを整数に変換する
//     const postId = parseInt(id, 10);

//     // Prismaを使って記事を更新する処理
//     const updatedPost = await prisma.post.update({
//         where: { id: postId },  // 更新する記事をIDで特定
//         data: {
//             title,                // 新しいタイトル
//             content,              // 新しい内容
//             thumbnail,            // サムネイルURL（オプション）
//             updatedAt: new Date(), // 更新日時を現在の日時に更新
//         },
//     });

//     // 更新された記事を返す
//     return updatedPost;
// };


import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { NextResponse } from "next/server";
import fs from "fs";
import path from 'path';

const schema = z.object({
    id: z.string(),
    title: z.string().min(1, "タイトルは必須です"),
    content: z.string().min(1, "内容は必須です"),
    thumbnail: z.instanceof(File).optional(),
});

export async function editPost(formData: FormData) {
    try {
        const data = {
            id: formData.get("id"),
            title: formData.get("title"),
            content: formData.get("content"),
            thumbnail: formData.get("thumbnail"),
        };

        const validatedData = schema.parse(data);

        let thumbnailUrl = null;
        if (validatedData.thumbnail) {
            const file = validatedData.thumbnail as File;
            const filePath = `${Date.now()}-${file.name}`;
            await saveImageToLocal(file, filePath);
            thumbnailUrl = `/uploads/${filePath}`;
        }

        await prisma.post.update({
            where: { id: validatedData.id },
            data: {
                title: validatedData.title,
                content: validatedData.content,
                thumbnail: thumbnailUrl || undefined,
            },
        });

        revalidatePath(`/posts/${validatedData.id}`);
        return NextResponse.json({ success: true, message: "記事が更新されました" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "更新に失敗しました" });
    }
}

async function saveImageToLocal(file: File, filePath: string) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = path.join(uploadDir, filePath);

    fs.writeFileSync(fullPath, buffer);
}