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
            Reply: {
                include: {
                    comment: {
                        include: {
                            post: {
                                include: {
                                    topic: true
                                }
                            }
                        }
                    }
                }
            },
            Comment: {
                include: {
                    post: {
                        include: {
                            topic: true
                        }
                    },
                    author: true
                }
            },
            Post: {
                include: {
                    topic: true
                }
            },
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    return notifications || []
}

export const notificationRead = async (notificationId: string) => {
    const notification = await prisma.notification.findFirst({
        where: { id: notificationId }
    })

    if (!notification) return { error: "Invalid notification." }

    if (!notification.isRead) {
        await prisma.notification.update({
            where: { id: notification.id },
            data: { isRead: true }
        })

        return { success: "Notification read." }
    }
}