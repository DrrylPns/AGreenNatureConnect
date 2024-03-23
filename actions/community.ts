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