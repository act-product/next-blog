"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
// Prismaクライアントのインスタンスを作成
const prisma = new client_1.PrismaClient();
async function main() {
    const dummyPosts = Array.from({ length: 20 }).map(() => ({
        title: faker_1.faker.lorem.sentence(), // ダミーのタイトル
        content: faker_1.faker.lorem.paragraphs(3), // ダミーの内容
        thumbnail: 'https://placehold.jp/1280x720.png', // サムネイルのダミーURL
        createdAt: faker_1.faker.date.past(), // 過去の日付をダミーの投稿日時として使用
        updatedAt: new Date(), // 現在の日付を更新日時として使用
    }));
    // ダミーデータをデータベースに挿入
    await prisma.post.createMany({
        data: dummyPosts,
    });
    console.log('ダミーの記事が20件挿入されました。');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
