import React from 'react';

interface PostDetailProps {
    title: string;
    content: string;
    thumbnail?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostDetail: React.FC<PostDetailProps> = ({ title, content, thumbnail, createdAt, updatedAt }) => {
    const defaultThumbnail = '/default-thumbnail.jpeg';

    return (
        <div className="post-detail">
            <h1>{title}</h1>
            <img
                src={thumbnail || defaultThumbnail}
                alt={title}
                style={{ width: '100%', height: 'auto' }}
            />
            <p>{content}</p>
            <small>Posted on: {new Date(createdAt).toLocaleDateString()}</small><br />
            <small>Updated on: {new Date(updatedAt).toLocaleDateString()}</small>
        </div>
    );
};

export default PostDetail;