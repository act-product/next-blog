import React from 'react';
import defaultThumbnail from '../public/default-thumbnail.jpeg';
interface PostItemProps {
    title: string;
    content: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

const PostItem: React.FC<PostItemProps> = ({ title, content, thumbnail, createdAt, updatedAt }) => {

    return (
        <div className="post-item">
            <img src={thumbnail || defaultThumbnail} alt={title} style={{ width: '100%', height: 'auto' }} />
            <h2>{title}</h2>
            <p>{content.length > 100 ? content.slice(0, 100) + '...' : content}</p>
            <small>Posted on: {new Date(createdAt).toLocaleDateString()}</small><br />
            <small>Updated on: {new Date(updatedAt).toLocaleDateString()}</small>
            <hr />
        </div>
    );
};

export default PostItem;
