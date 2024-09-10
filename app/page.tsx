import React from 'react';
import { getPosts } from './actions/getPosts';
import PostItem from './components/PostItem';

const Page = async () => {

  const posts = await getPosts();

  return (
    <div className="post-list">
      <h1>記事一覧</h1>
      {posts.length === 0 ? (
        <p>投稿はありません</p>
      ) : (
        posts.map(post => (
          <PostItem
            key={post.id}
            title={post.title}
            content={post.content}
            thumbnail={post.thumbnail}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
          />
        ))
      )}
    </div>
  );
};

export default Page;