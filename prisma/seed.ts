import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // ダミー記事データの生成
    const dummyPosts = Array.from({ length: 20 }).map(() => ({
        title: faker.lorem.sentence(),  // タイトルを生成
        content: faker.lorem.paragraphs(3),  // コンテンツを生成
        thumbnail: 'https://placehold.jp/1280x720.png',  // サムネイルのURL
        createdAt: faker.date.past(),  // 過去の日付を生成
        updatedAt: new Date(),  // 現在の日付
    }));

    // ダミー記事をデータベースに挿入
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
