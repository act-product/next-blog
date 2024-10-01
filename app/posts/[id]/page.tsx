import React from 'react';
import { getPostById } from '../../actions/getPostById';
import PostDetail from '../../components/PostDetail';
import Link from 'next/link';
import { notFound } from 'next/navigation'

interface PostPageProps {
    params: {
        id: string;
    };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
    const id = parseInt(params.id, 10);
    const post = await getPostById(id);

    if (!post) {
        //記事が見つからない場合はNot Foundページを返す
        return notFound()
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>{post.title}</h1>
            </div>
            <PostDetail
                title={post.title}
                content={post.content}
                thumbnail={post.thumbnail}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
            />
        </div>

    );
};

export default PostPage;