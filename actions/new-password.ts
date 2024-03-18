"use server";


import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail } from "../data/user";
import bcrypt from "bcrypt"
import prisma from "@/lib/db/db";
import { NewPasswordSchema, NewPasswordType } from "@/lib/validations/changePasswordSchema";

export const newPassword = async (
    values: NewPasswordType,
    token?: string | null,
) => {
    if (!token) {
        return { error: "Missing token" }
    }

    const validatedFields = NewPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Invalid token!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            hashedPassword
        }
    })

    await prisma.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "Password updated!" }
}