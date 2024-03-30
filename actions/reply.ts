"use server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import Filter from "bad-words";


export const replyComment = async (commentId: string, text: string) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findFirst({
            where: { id: session.user.id }
        })
        if (!user) return { error: "No user found." }

        const filter = new Filter();
        const words = require("../src/app/(user)/discussion/components/extra-words.json");
        filter.addWords(...words);

        const isInvalidComment = filter.isProfane(text);

        if (isInvalidComment) return { error: "Your reply is invalid because you are using a bad word" }

        if (text.length < 1 || text.length > 1000) {
            return { error: "Reply length must be between 1 and 1000 characters." }
        }

        if (!commentId) return { error: "No comment found." }
        console.log(commentId, text)

        await prisma.reply.create({
            data: {
                userId: user.id,
                commentId: commentId,
                text: text
            }
        })
        return { success: "Reply added" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const fetchReplies = async (postId: string,) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        if (!user) return { error: "No user found!" }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: true
            }
        })

        const comments = await prisma.comment.findMany({
            where: {
                postId
            },
            include: {
                replyOnComent: true
            }
        })

        console.log(comments.map((comment) => {
            return comment.replyOnComent.map((replies) => {
                return replies.text
            })
        }))

        // const replies = await prisma.reply.findMany({
        //     where: {
        //         commentId: 
        //     }
        // })


        return comments
    } catch (error: any) {
        throw new Error(error)
    }
}
