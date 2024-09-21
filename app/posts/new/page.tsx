"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';

const postSchema = z.object({
    title: z.string().nonempty('タイトルは必須です'),
    content: z.string().nonempty('内容は必須です'),
    image: z.instanceof(File).optional(),
});

const NewPostPage = () => {
    const router = useRouter();
    const [flashMessage, setFlashMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postSchema),
    });

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('投稿に失敗しました');
            }

            const post = await res.json();
            setFlashMessage('投稿しました');
            router.push(`../posts/${post.id}`); // 詳細ページにリダイレクト
        } catch (error) {
            console.error('エラー:', error);
        }
    };

    return (
        <div>
            {flashMessage && (
                <strong>{flashMessage}</strong>
            )}
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
