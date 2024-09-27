import React from 'react';
import { getPosts } from './actions/getPosts';
import PostItem from './components/PostItem';
import Link from 'next/link';

const Page = async () => {

  const posts = await getPosts();

  return (
    <div className="post-list">
      <h1>記事一覧</h1>
      {posts.length === 0 ? (
        <p>投稿はありません</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <PostItem
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              createdAt={new Date(post.createdAt)}
              updatedAt={new Date(post.updatedAt)}
            />
            <Link href={`/posts/${post.id}`}>
              続きを読む
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;