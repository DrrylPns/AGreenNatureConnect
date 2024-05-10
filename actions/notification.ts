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
            Reaction: {
                include: {
                    post: {
                        include: {
                            topic: true
                        }
                    },
                    user: true
                }
            },
            Reply: {
                include: {
                    user: true,
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
                    author: true,
                    topic: true,
                }
            },
            consignor: {
                include: {
                    urbanFarm: true
                }
            },
            urbanFarmApplication: {
                include: {
                    user: true
                }
            },
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    return notifications
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

export const notificationReadAll = async (userId: string | undefined) => {
    try {

        if (!userId) return { error: "No user found!" }

        await prisma.notification.updateMany({
            where: {
                userId
            },
            data: {
                isRead: true
            },
        })

        return { success: "Notification read." }
    } catch (error) {
        throw new Error(error as any)
    }
}