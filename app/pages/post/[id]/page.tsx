import { getPostById } from '../../../actions/getPostById';
import PostDetail from '../../../components/PostDetail';
import PostNotFound from '../not-found';


interface PostPageProps {
    params: {
        id: string;
    };
}

const PostPage = async ({ params }: PostPageProps) => {
    const id = parseInt(params.id, 10);
    const post = await getPostById(id);
    console.log('Fetched Post:', post);

    if (!post) {
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