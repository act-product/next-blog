import React from 'react';
import Image from 'next/image';
import defaultThumbnail from '../src/assets/default-thumbnail.jpeg';

interface PostItemProps {
    title: string;
    content: string;
    thumbnail?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostItem: React.FC<PostItemProps> = ({ title, content, thumbnail, createdAt, updatedAt }) => {

    return (
        <div className="post-item">
            <Image
                src={thumbnail || defaultThumbnail}
                alt={title}
                width={1280}
                height={720}
                layout="responsive"
                objectFit="cover"
            />
            <h2>{title}</h2>
            <p>{content.length > 100 ? content.slice(0, 100) + '...' : content}</p>
            <small>Posted on: {new Date(createdAt).toLocaleDateString()}</small><br />
            <small>Updated on: {new Date(updatedAt).toLocaleDateString()}</small>
            <hr />
        </div>
    );
};

export default PostItem;
