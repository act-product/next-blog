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

const postSchema = z.object({
    title: z.string().nonempty('タイトルは必須です'),
    content: z.string().nonempty('内容は必須です'),
    image: z.any().optional(),
});

interface PostFormData {
    title: string;
    content: string;
    image: FileList | null;
}

const EditPostPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [post, setPost] = useState<PostFormData | null>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    //記事の既存データを取得
    useEffect(() => {
        const fetchPost = async () => {
            const post = await getPostById(parseInt(params.id));
            if (post) {
                setPost(post);
                setValue("title", post.title);
                setValue("content", post.content);
            } else {
                toast.error("記事が見つかりません", { autoClose: 3000 });
                router.push('/posts');
            }
        };
        fetchPost();
    }, [params.id, setValue, router]);

    const onSubmit = async (data: PostFormData) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            await editPost(parseInt(params.id), data.title, data.content, data.image ? data.image[0] : null);
            toast.success("更新しました", { autoClose: 3000 });
            router.push(`../../posts/${params.id}`);
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
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div>
                        <label>内容：</label>
                        <textarea {...register("content")}></textarea>
                        {errors.content && <p>{errors.content.message}</p>}
                    </div>
                    <div>
                        <label>画像：</label>
                        <input type="file" {...register("image")} />
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
