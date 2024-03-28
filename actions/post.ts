"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"

export const deletePost = async (postId: string) => {
    try {
        const session = getAuthSession()

        if (!session) return { error: "Unauthorized" }

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