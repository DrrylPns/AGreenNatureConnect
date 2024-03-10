import prisma from "@/lib/db/db"
import { getAuthSession } from "@/lib/auth";
import { OnboardingUserSchema } from "@/lib/validations/onboardingSchema";
import { calculateDaysUntilUsernameChange } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json();
        const { username, phoneNumber, birthday, address, lastName, name } = OnboardingUserSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        const usernameExists = await prisma.user.findFirst({
            where: { username: username },
        });

        if (usernameExists && usernameExists.id !== session.user.id) {
            return new Response("Username is already in use", { status: 409 })
        }

        const phoneNumberExists = await prisma.user.findFirst({
            where: { phoneNumber: phoneNumber }
        })

        if (phoneNumberExists && phoneNumberExists.id !== session.user.id) {
            return new Response("Error: Bad Request, phone number is already in use by another user.", { status: 400 })
        }

        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const daysLeft = calculateDaysUntilUsernameChange(user.lastUsernameChange as Date);

        const dataToUpdate: Record<string, any> = {
            phoneNumber: phoneNumber,
            birthday: birthday,
            address: address,
            lastUsernameChange: new Date(),
            lastName: lastName,
            name: name,
        }

        if (daysLeft <= 0) {
            dataToUpdate.username = username;
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: dataToUpdate
        });

        return new Response("Username updated successfully", { status: 200 })
    } catch (error: any) {
        return new Response(`${error.message}`, { status: 500 })
    }
};
