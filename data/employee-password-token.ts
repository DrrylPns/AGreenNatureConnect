import prisma from "@/lib/db/db";

export const getEmployeePasswordTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: { token }
        })

        return passwordResetToken
    } catch (error) {
        return null
    }
}

export const getEmployeePasswordTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where: { email }
        })

        return passwordResetToken
    } catch (error) {
        return null
    }
}