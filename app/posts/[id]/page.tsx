import React from 'react';
import { getPostById } from '../../actions/getPostById';
import PostDetail from '../../components/PostDetail';
import PostNotFound from '../not-found';


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
        return <PostNotFound />;
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