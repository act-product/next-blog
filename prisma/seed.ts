import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    const dummyPosts = Array.from({ length: 20 }).map(() => ({
        title: faker.lorem.sentence().substring(0, 50),  //文字数を制限
        content: faker.lorem.paragraphs(3).substring(0, 255),  //文字数を制限
        thumbnail: 'https://placehold.jp/1280x720.png',
        createdAt: faker.date.past(),          // 過去の日付をダミーの投稿日時として使用
        updatedAt: new Date(),                 // 現在の日付を更新日時として使用
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
