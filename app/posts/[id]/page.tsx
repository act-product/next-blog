import React from 'react';
import { getPostById } from '../../actions/getPostById';
import PostDetail from '../../components/PostDetail';

interface PostPageProps {
    params: {
        id: string;
    };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
    const id = parseInt(params.id, 10);
    const post = await getPostById(id);

    if (!post) {
        return <p>記事が見つかりません</p>;
    }

    return (
        <PostDetail
            title={post.title}
            content={post.content}
            thumbnail={post.thumbnail}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
        />
    );
};

export default PostPage;