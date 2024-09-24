// import React from 'react';
// import { getPosts } from './actions/getPosts';
// import PostItem from './components/PostItem';
// import Link from 'next/link';

// const Page = async () => {

//   const posts = await getPosts();

//   return (
//     <div className="post-list">
//       <h1>記事一覧</h1>
//       <Link href={`/posts/${post.id}`}>
//         {posts.title}
//       </Link>
//       {posts.length === 0 ? (
//         <p>投稿はありません</p>
//       ) : (
//         posts.map(post => (
//           <div key={post.id}>
//             <PostItem
//               title={post.title}
//               content={post.content}
//               thumbnail={post.thumbnail}
//               createdAt={post.createdAt}
//               updatedAt={post.updatedAt}
//             />
//             <Link href={`/posts/${post.id}`}>
//               続きを読む
//             </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Page;



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
            {/* PostItem コンポーネントで投稿の詳細を表示 */}
            <PostItem
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />

            {/* 続きを読むリンク */}
            <Link href={`/posts/${post.id}`}>
              続きを読む
            </Link>

            {/* 編集リンク */}
            <Link href={`/posts/${post.id}/edit`}>
              <button style={{ marginLeft: '10px' }}>編集</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
