"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import Filter from "bad-words";

export const editComment = async (id: string, text: string) => {
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

        if (isInvalidComment) return { error: "Your commment is invalid because you are using a bad word" }

        if (!id) return { error: "No comment found." }

        if (text.length < 1 || text.length > 1000) {
            return { error: "Comment length must be between 1 and 1000 characters." }
        }

        await prisma.comment.update({
            where: { id },
            data: {
                text
            }
        })

        return { success: "Comment edited!" }
    } catch (error: any) {
        throw new Error(error)
    }
}