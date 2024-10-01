import prisma from '../lib/prisma';

interface EditPostParams {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null | undefined;
}

export async function editPost({ id, title, content, thumbnail }: EditPostParams) {
    try {
        const postId = parseInt(id, 10);
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                thumbnail,
            },
        });
        return updatedPost;
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Unable to update post');
    }
}