"use server"

import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { calculateDaysUntilUsernameChange } from "@/lib/utils"
import { ChangeUserProfileSchema, ChangeUserProfileType, ChangeUsernameSchema, ChangeUsernameType } from "@/lib/validations/changeUserProfile"
import { revalidatePath } from "next/cache"

export const changeGender = async (gender: string) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) return { error: "No user found! Try logging in!" }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                gender,
            }
        })

        revalidatePath("/")
        return { success: "Gender updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const changeAvatar = async (avatar: string) => {
    try {
        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) return { error: "No user found! Try logging in!" }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                image: avatar,
            }
        })

        revalidatePath("/")
        return { success: "Avatar updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const changeProfile = async (values: ChangeUserProfileType) => {
    try {
        const validatedFields = ChangeUserProfileSchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields!" }

        const { newAddress, newBirthday, newPhone } = validatedFields.data

        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) return { error: "No user found! Try logging in!" }

        const phoneNumberExists = await prisma.user.findUnique({
            where: { phoneNumber: newPhone }
        })

        if (phoneNumberExists && user.id !== phoneNumberExists.id) return { error: "Phone number already exists!" }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                address: newAddress,
                birthday: newBirthday,
                phoneNumber: newPhone,
            }
        })

        revalidatePath("/")
        return { success: "Profile updated!" }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const changeUsername = async (values: ChangeUsernameType) => {
    try {
        const validatedFields = ChangeUsernameSchema.safeParse(values)

        if (!validatedFields.success) return { error: "Invalid fields!" }

        const { newUsername } = validatedFields.data

        const session = await getAuthSession()

        if (!session) return { error: "Unauthorized" }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) return { error: "No user found! Try logging in!" }

        const usernameExists = await prisma.user.findUnique({
            where: { username: newUsername }
        })

        if (usernameExists && user.id !== usernameExists.id) return { error: "Username already taken by another user!" }

        if (usernameExists?.username === newUsername) {
            return { error: "The new username is the same as the current one. Please choose a different username." };
        }


        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const daysLeft = calculateDaysUntilUsernameChange(user.lastUsernameChange as Date);

        const dataToUpdate: Record<string, any> = {
            lastUsernameChange: new Date(),
        }

        if (daysLeft <= 0) {
            dataToUpdate.username = newUsername
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: dataToUpdate
        })

        revalidatePath("/")
        return { success: "Username changed!" }
    } catch (error) {

    }
}