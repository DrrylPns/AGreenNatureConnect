"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { ChangeCommunitySettingsSchema, ChangeCommunitySettingsType } from "@/lib/validations/changeUserProfile"
import { Prisma } from "@prisma/client"
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

export const fetchCommunities = async (search?: string) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const communities = await prisma.community.findMany({
            include: {
                messages: true,
            },
            where: {
                isArchived: false,
                ...(search && {
                    OR: [
                        {
                            urbanFarmName: {
                                contains: search,
                                mode: "insensitive"
                            },
                        },
                        {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            },
                        }
                    ]
                })
            }
        });

        return communities;
    } catch (error: any) {
        throw new Error(error);
    }
}


export const getCommunitiesWithoutSession = async () => {
    try {
        const communities = await prisma.community.findMany({
            where: {
                isArchived: false
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

export const changeCommunitySettings = async (values: ChangeCommunitySettingsType) => {
    try {
        const validatedFields = ChangeCommunitySettingsSchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields!" }

        const { newPhone } = validatedFields.data

        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) return { error: "No user found! Try logging in!" }

        if (user.role !== "ADMIN") return { error: "Unauthorized, this user is not an admin!" }

        const phoneNumberExists = await prisma.user.findUnique({
            where: { phoneNumber: newPhone }
        })

        if (phoneNumberExists && user.id !== phoneNumberExists.id) return { error: "Phone number already exists!" }

        await prisma.community.update({
            where: { id: user.communityId as string },
            data: {
                contactNumber: newPhone,
            }
        })

        revalidatePath("/")
        return { success: "Community settings updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const handleCommunity = async (id: string, isArchivePanel: boolean | undefined) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const currentUser = await prisma.user.findUnique({
            where: {
                id: session.user.id
            }
        })

        if (!currentUser) return { error: "No user found!" }

        if (currentUser.role !== "SUPER_ADMIN") return { error: "This account is unauthorized to do this action!" }

        if (!id) return { error: "Invalid community!" }

        if (isArchivePanel) {
            await prisma.community.update({
                where: {
                    id
                },
                data: {
                    isArchived: false
                }
            })

            return { success: "Community restored." }
        } else {
            await prisma.community.update({
                where: {
                    id
                },
                data: {
                    isArchived: true
                }
            })

            return { success: "Community archived." }
        }
    } catch (error) {
        throw new Error(error as any)
    }
}

export const handleCarousel = async (imageUrls: string[]) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const currentUser = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                Community: true
            }
        })

        if (!currentUser) return { error: "No user found!" }

        if (currentUser.role !== "ADMIN") return { error: "This account is unauthorized to do this action!" }

        const communityImages: Prisma.CommunityImageCreateNestedManyWithoutCommunityInput = {
            create: imageUrls.map((imageUrl) => ({
                imageUrl
            }))
        };

        await prisma.community.update({
            where: {
                id: currentUser.Community?.id
            },
            data: {
                carouselImage: communityImages
            }
        })

        return { success: "Added community carousel!" }
    } catch (error) {
        throw new Error(error as any)
    }
}