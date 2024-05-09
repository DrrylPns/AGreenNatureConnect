"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { ChangeCommunitySettingsSchema, ChangeCommunitySettingsType } from "@/lib/validations/changeUserProfile"
import { CreateCommunitySchema, CreateCommunityType } from "@/lib/validations/super-admin/createCommunity"
import { Community, Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { sendEmployeePasswordLink } from "./set-employee-password"
import { PasabuySchema, PasabuyType } from "@/lib/validations/pasabuy"

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
                            name: {
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

export const createUrbanFarm = async (values: CreateCommunityType, image: string) => {
    try {
        const currentYear = new Date().getFullYear()
        const session = await getAuthSession()

        const currentUser = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            }
        })

        if (!currentUser) return { error: "Error: No current user found!" }

        if (currentUser.role !== "SUPER_ADMIN") return { error: "Error: Unauthorized!" }

        const validatedFields = CreateCommunitySchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields" }

        const {
            urbanFarmName,
            communityAddress,
            blk,
            email,
            firstname,
            gender,
            lastName,
            street,
            userPhone,
            zip,
        } = validatedFields.data

        const emailExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (emailExist) return { error: "User email already exist!" }

        const phoneNumberExists = await prisma.user.findFirst({
            where: { phoneNumber: userPhone }
        })

        if (phoneNumberExists) return { error: "Phone number already exist!" }

        const urbanFarmExists = await prisma.community.findFirst({
            where: {
                name: urbanFarmName,
            }
        })

        if (urbanFarmExists) return { error: "Urban farm already exist!" }

        const currentDate = new Date();

        const successUserCreate = await prisma.user.create({
            data: {
                name: firstname,
                role: "ADMIN",
                phoneNumber: userPhone,
                gender,
                email,
                lastName,
                emailVerified: currentDate,
                // hashedPassword,
                Community: {
                    create: {
                        // name: barangayName,
                        address: communityAddress,
                        form: image,
                        blk,
                        street,
                        zip,
                        // description: communityDescription,
                        // email: communityEmail,
                        // displayPhoto: communityDisplayPhoto,
                        // contactNumber: phone,
                        name: urbanFarmName,
                        // carouselImage: communityImages,
                    }
                }
            }
        })

        if (successUserCreate) {
            sendEmployeePasswordLink(successUserCreate.email as string)
        }

        return { success: "Urban farm created successfully!" }
    } catch (error) {
        throw new Error(error as any)
    }
}

export const createPasabuy = async (values: PasabuyType, image: string) => {
    try {
        const currentYear = new Date().getFullYear()
        const session = await getAuthSession()

        const currentUser = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            }
        })

        if (!currentUser) return { error: "Error: No current user found!" }


        const validatedFields = PasabuySchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields" }

        const {
            urbanFarmName,
            communityAddress,
            blk,
            email,
            firstname,
            gender,
            lastName,
            street,
            userPhone,
            zip,
            area,
            form,
        } = validatedFields.data

        // const emailExist = await prisma.user.findFirst({
        //     where: {
        //         email
        //     }
        // })

        // if (emailExist) return { error: "User email already exist!" }

        // const phoneNumberExists = await prisma.user.findFirst({
        //     where: { phoneNumber: userPhone }
        // })

        // if (phoneNumberExists) return { error: "Phone number already exist!" }

        // const urbanFarmExists = await prisma.community.findFirst({
        //     where: {
        //         name: urbanFarmName,
        //     }
        // })

        // if (urbanFarmExists) return { error: "Urban farm already exist!" }

        const sameUserId = await prisma.urbanFarmApplicatants.findFirst({
            where: {
                userId: currentUser.id
            }
        })

        if (!sameUserId) {
            const successUserCreate = await prisma.urbanFarmApplicatants.create({
                data: {
                    urbanFarmName: urbanFarmName,
                    firstName: firstname,
                    form: form || '',
                    address: communityAddress,
                    contact: userPhone,
                    gender,
                    email,
                    lastName,
                    street,
                    blk,
                    area,
                    zip,
                    status: "Pending",
                    userId: currentUser.id,
                }
            })

            return { success: "Urban farm created successfully!" }
        } else {
            return { error: "You already file your request to become a consignor!" }
        }

    } catch (error) {
        throw new Error(error as any)
    }
}

export const handleFarmerStaff = async (id: string, handler: boolean) => {
    try {
        if (!id) return { error: "Error: No urban farm staff selected!" }

        await prisma.user.update({
            where: {
                id
            },
            data: {
                isDisabled: handler
            }
        })

        return { success: "Success!" }
    } catch (error) {
        throw new Error(error as any)
    }
}

export const fetchUrbanFarms = async (barangay: string) => {
    const urbanFarms = await prisma.community.findMany({
        where: {
            address: barangay
        },
        include: {

        }
    })
    return urbanFarms
}