import React from 'react';
import Image from 'next/image';
import defaultThumbnail from '../public/default-thumbnail.jpeg';

interface PostDetailProps {
    title: string;
    content: string;
    thumbnail?: string | undefined | null;
    createdAt: Date;
    updatedAt: Date;
}

const PostDetail: React.FC<PostDetailProps> = ({ title, content, thumbnail, createdAt, updatedAt }) => {
    return (
        <div className="post-detail">
            <h1>{title}</h1>
            <Image
                src={thumbnail || defaultThumbnail}
                alt={title}
                width={1280}
                height={720}
                layout="responsive"
                objectFit="cover"
            />
            <p>{content}</p>
            <small>Posted on: {new Date(createdAt).toLocaleDateString()}</small><br />
            <small>Updated on: {new Date(updatedAt).toLocaleDateString()}</small>
        </div>
    );
};

export default PostDetail;