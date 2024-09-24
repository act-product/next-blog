import React from 'react';

const PostNotFound: React.FC = () => {
    return (
        <div>
            <h1>投稿が見つかりませんでした</h1>
            <p>指定された投稿は存在しないか、削除された可能性があります。</p>
            <a href="/posts">投稿一覧に戻る</a>
        </div>
    );
};

export default PostNotFound;
