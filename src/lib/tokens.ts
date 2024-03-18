import { getPasswordResetTokenByEmail } from "../../data/password-reset-token";
import { getVerificationTokenByEmail } from "../../data/verification-token";
import prisma from "./db/db";
import { v4 as uuidv4 } from "uuid"

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // expire token in 1 hour

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // expire token in 1 hour

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return verificationToken
}