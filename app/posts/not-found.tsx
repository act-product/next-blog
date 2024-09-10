import react from 'react';
import Link from 'next/link';

const PostNotFound: React.FC = () => {
    return (
        <div className="post-not-found">
            <h1>投稿がありません</h1>
            <p>指定された記事が見つかりませんでした。</p>
            <Link href="/">
                <button>投稿一覧に戻る</button>
            </Link>
        </div>
    );
};

export default PostNotFound;