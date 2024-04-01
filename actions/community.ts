"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { revalidatePath } from "next/cache"

export const addQR = async (id: string, qrCode: string) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        await prisma.community.update({
            where: { id },
            data: {
                qrCode
            }
        })

        revalidatePath("/")
        return { success: "Successfully added qr code!" }
    } catch (error) {
        return { error: error }
    }
}

export const fetchCommunities = async () => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const communities = await prisma.community.findMany({
            include: {
                messages: true,
            }
        })

        return communities
    } catch (error: any) {
        throw new Error(error)
    }
}

export const fetchUsersWhoChatted = async (communityId: string) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const community = await prisma.community.findUnique({
            where: { id: communityId }
        })

        if (!community) {
            return { error: "Community not found" }
        }

        const userWhoChatted = await prisma.user.findMany({
            where: {
                Message: {
                    some: {
                        communityId: community.id
                    }
                }
            }
        })

        return userWhoChatted
    } catch (error: any) {
        throw new Error(error)
    }
}