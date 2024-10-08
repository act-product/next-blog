'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editPost } from '../../../actions/editPost';
import { getPostById } from '../../../actions/getPostById';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';

// Zodスキーマの定義
const postSchema = z.object({
    title: z.string().min(1, 'タイトルは必須です'),
    content: z.string().min(1, '内容は必須です'),
    thumbnail: z.any().optional(),
});

interface PostFormData {
    title: string;
    content: string;
    thumbnail: FileList | null;
    existingThumbnail?: string | null;
}

const EditPostPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [post, setPost] = useState<PostFormData | null>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    // 記事の既存データを取得
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postId = parseInt(params.id, 10);
                console.log("Fetching post with ID:", postId); // 追加
                const postData = await getPostById(postId);
                if (postData) {
                    setPost({
                        title: postData.title,
                        content: postData.content,
                        thumbnail: null,
                        existingThumbnail: postData.thumbnail
                    });
                    setValue("title", postData.title);
                    setValue("content", postData.content);
                } else {
                    toast.error("記事が見つかりません", { autoClose: 3000 });
                }
            } catch (error) {
                toast.error("記事の取得に失敗しました", { autoClose: 3000 });
                console.error("記事の取得エラー:", error);
            }
        };
        fetchPost();
    }, [params.id, setValue]);

    const onSubmit = async (data: PostFormData) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.thumbnail && data.thumbnail.length > 0) {
            formData.append('thumbnail', data.thumbnail[0]);
        }

        try {
            const result = await editPost(parseInt(params.id, 10), formData);
            if (result.success) {
                toast.success("更新しました", { autoClose: 3000 });
                router.push(`/posts/${params.id}`);
            } else {
                throw new Error(result.error || 'Failed to update post');
            }
        } catch (error) {
            toast.error('更新に失敗しました', { autoClose: 3000 });
            console.error('Error updating post:', error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1>記事を編集</h1>
            {post ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>タイトル：</label>
                        <input type="text" {...register("title")} />
                        {errors.title && <p className="error">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label>内容：</label>
                        <textarea {...register("content")}></textarea>
                        {errors.content && <p className="error">{errors.content.message}</p>}
                    </div>
                    <div>
                        <label>画像：</label>
                        <input type="file" {...register("thumbnail")} />
                    </div>
                    <button type="submit">更新</button>
                </form>
            ) : (
                <p>記事を読み込み中...</p>
            )}
        </div>
    );
};

export default EditPostPage;
