
"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"

export const deletePost = async (postId: string) => {
    try {
        const session = getAuthSession()

        if (!session) return { error: "Unauthorized" }

        // Fetch the post with its comments and associated replies
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: {
                    include: {
                        replyOnComent: true
                    }
                }
            }
        })

        if (!post) {
            return { error: "Post not found" }
        }

        // Delete associated replies first
        for (const comment of post.comments) {
            for (const reply of comment.replyOnComent) {
                await prisma.reply.delete({
                    where: {
                        id: reply.id
                    }
                })
            }
        }

        // Delete associated comments
        await prisma.comment.deleteMany({
            where: {
                postId: postId
            }
        })

        // Finally, delete the post itself
        await prisma.post.delete({
            where: {
                id: postId
            }
        })

        return { success: "Post deleted!" }
    } catch (error: any) {
        throw new Error(error)
    }
}
