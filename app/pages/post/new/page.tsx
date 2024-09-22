"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPost } from '../../../actions/addPost';
import { toast, ToastContainer } from 'react-toastify'; // react-toastify をインポート
import 'react-toastify/dist/ReactToastify.css'; // トーストのスタイルをインポート
import React from 'react';

// バリデーションスキーマ
const postSchema = z.object({
    title: z.string().nonempty('タイトルは必須です'),
    content: z.string().nonempty('内容は必須です'),
    image: z.any().optional(),
});

// フォームデータの型
interface PostFormData {
    title: string;
    content: string;
    image: FileList | null;
}

const NewPostPage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const onSubmit = async (data: PostFormData) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const post = await addPost(formData);
            toast.success("投稿しました", { autoClose: 3000 }); // 投稿成功メッセージを表示
            router.push(`../../post/${post.id}`); // 投稿詳細ページにリダイレクト
        } catch (error) {
            toast.error('投稿に失敗しました', { autoClose: 3000 }); // 投稿失敗メッセージを表示
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            {/* トースト通知のコンテナ */}
            <ToastContainer />

            <h1>新規投稿</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>タイトル:</label>
                    <input type="text" {...register("title")} />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div>
                    <label>内容:</label>
                    <textarea {...register("content")}></textarea>
                    {errors.content && <p>{errors.content.message}</p>}
                </div>
                <div>
                    <label>画像:</label>
                    <input type="file" {...register("image")} />
                </div>
                <button type="submit">作成</button>
            </form>
        </div>
    );
};

export default NewPostPage;
