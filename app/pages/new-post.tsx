'use client';

import React, { useState } from 'react';
import { addPost } from '@/actions/addPost';

const NewPostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            alert('タイトルと内容は必須です。');
            return;
        }

        try {
            const newPost = await addPost({ title, content, image });
            console.log('New post created:', newPost);
        } catch (error) {
            console.error('Error creating post:', error);
            alert('記事の作成に失敗しました。');
        }
    };

    return (
        <div>
            <h1>新しい記事を作成</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="内容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />
                <button type="submit">記事を作成</button>
            </form>
        </div>
    );
};

export default NewPostPage;