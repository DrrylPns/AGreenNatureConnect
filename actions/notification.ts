"use server"

import { getAuthSession } from "@/lib/auth"
import { getUserById } from "../data/user"
import prisma from "@/lib/db/db"

export const fetchNotifications = async () => {
    const session = await getAuthSession()

    if (!session) return { error: "Unauthorized" }

    const user = await getUserById(session.user.id)

    if (!user) return { error: "No user found!" }

    const notifications = await prisma.notification.findMany({
        where: { userId: user.id },
        include: {
            user: true,
            community: true,
            transaction: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    return notifications || []
}