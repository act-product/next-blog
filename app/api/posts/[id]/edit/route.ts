// app/api/posts/[id]/edit/route.ts
import { NextResponse } from "next/server";
import multer from "multer";
import prisma from "../../../../lib/prisma";

// multerの設定
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // 保存先ディレクトリ
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 一意のファイル名
    }
});

const upload = multer({ storage: storage });

export const POST = async (req) => {
    return new Promise((resolve, reject) => {
        upload.single('thumbnail')(req, {}, async (err) => {
            if (err) {
                return reject(err);
            }

            const { id, title, content } = req.body;

            if (!id || !title || !content) {
                return NextResponse.json({ error: "ID、タイトル、または内容が不足しています" }, { status: 400 });
            }

            const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

            const updatedPost = await prisma.post.update({
                where: { id: parseInt(id, 10) },
                data: {
                    title,
                    content,
                    thumbnail,
                    updatedAt: new Date(),
                },
            });

            return resolve(NextResponse.json(updatedPost));
        });
    });
};
