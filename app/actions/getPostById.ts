// import prisma from '../lib/prisma';

// interface Post {
//     id: number;
// }

// export async function getPostById(id: number) {
//     try {
//         return await prisma.post.findUnique({
//             where: {
//                 id: id,
//             },
//         });
//     } catch (error) {
//         console.error('IDからの記事取得に失敗しました', error);
//         throw new Error('IDから記事を取得できません');
//     }
// }


import prisma from '../lib/prisma';

export async function getPostById(id: number) {
    try {
        console.log("取得しようとしているID:", id);  // IDをログ出力

        if (isNaN(id) || id <= 0) {
            throw new Error("無効なIDが指定されました");
        }

        const post = await prisma.post.findUnique({
            where: { id: id },
        });

        if (!post) {
            console.error(`ID: ${id} の記事が見つかりません`);
            return null;  // null を返すことで、フロントエンドで NotFound を表示
        }

        return post;

    } catch (error) {
        console.error('IDからの記事取得に失敗しました。ID:', id, 'エラー詳細:', error);  // エラー詳細をログに出力
        throw new Error('IDから記事を取得できません');
    }
}
