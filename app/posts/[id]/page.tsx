// 'use client';

// import React from 'react';
// import { getPostById } from '../../actions/getPostById';
// import PostDetail from '../../components/PostDetail';
// import Link from 'next/link';
// import { notFound } from 'next/navigation'
// import { deletePost } from '../../actions/deletePost';
// import { useRouter } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// interface PostPageProps {
//     params: {
//         id: string;
//     };
// }

// const PostPage: React.FC<PostPageProps> = async ({ params }) => {
//     const id = parseInt(params.id, 10);
//     const post = await getPostById(id);

//     const router = useRouter();
//     const handleDelete = async () => {
//         const result = await deletePost(params.id);
//         if (confirm('本当に削除しますか？')) {
//             try {
//                 await deletePost(Number(params.id));
//                 toast.success("削除しました", { autoClose: 3000 });
//                 router.push('/posts');
//             } catch (error) {
//                 toast.error('削除に失敗しました', { autoClose: 3000 });
//                 console.error('Error deleting post:', error);
//             }
//         }
//     };

//     if (!post) {
//         //記事が見つからない場合はNot Foundページを返す
//         return notFound()
//     }

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1>{post.title}</h1>
//                 <Link href={`/posts/${id}/edit`}>
//                     <button style={{ marginLeft: '10px' }}>編集</button>
//                 </Link>
//                 <button onClick={handleDelete}>削除</button>
//             </div>
//             <PostDetail
//                 title={post.title}
//                 content={post.content}
//                 thumbnail={post.thumbnail}
//                 createdAt={post.createdAt}
//                 updatedAt={post.updatedAt}
//             />
//         </div>

//     );
// };

// export default PostPage;

'use client';

import React, { useEffect, useState } from 'react';
import { getPostById } from '../../actions/getPostById';
import PostDetail from '../../components/PostDetail';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deletePost } from '../../actions/deletePost';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PostPageProps {
    params: {
        id: string;
    };
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const id = parseInt(params.id, 10);

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPostById(id);
            if (postData) {
                setPost(postData);
            } else {
                notFound();
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (confirm('本当に削除しますか？')) {
            try {
                await deletePost(Number(params.id));
                toast.success("削除しました", { autoClose: 3000 });
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } catch (error) {
                toast.error('削除に失敗しました', { autoClose: 3000 });
                console.error('Error deleting post:', error);
            }
        }
    };

    if (!post) {
        return null;
    }

    return (
        <div>
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <h1 style={{ marginRight: '10px' }}>{post.title}</h1>
                <Link href={`/posts/${id}/edit`}>
                    <button style={{ marginLeft: '10px' }}>編集</button>
                </Link>
                <button onClick={handleDelete} style={{ marginLeft: '10px' }}>削除</button>
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