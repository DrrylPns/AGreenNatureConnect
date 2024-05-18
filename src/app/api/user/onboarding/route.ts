import prisma from "@/lib/db/db"
import { getAuthSession } from "../../../../lib/auth";
import { OnboardingSchema } from "@/lib/validations/onboardingSchema";
import { calculateDaysUntilUsernameChange } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session) {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json();
        const { username, community, phoneNumber, birthday, address, lastName, name, suffix, blk, street, zip, barangay } = OnboardingSchema.parse(body);

        console.log(session.user.id)

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
            suffix: suffix,
            blk,
            street,
            zip,
            barangay,
        }

        if (community === "Others") {
            if (daysLeft <= 0) {
                dataToUpdate.username = username;
            }

            await prisma.user.update({
                where: { id: session.user.id },
                data: dataToUpdate
            });

            return new Response("User updated community others!", { status: 200 })
        } else {
            const existingCommunity = await prisma.community.findFirst({
                where: { name: community }
            });

            if (existingCommunity) {
                dataToUpdate.Community = {
                    connect: {
                        id: existingCommunity.id
                    }
                }

            } else {
                const newCommunity = await prisma.community.create({
                    data: {
                        name: community,
                        address: address || ''
                    }
                });

                dataToUpdate.Community = {
                    connect: {
                        id: newCommunity.id
                    }
                }
            }

            if (daysLeft <= 0) {
                dataToUpdate.username = username;
            }

            await prisma.user.update({
                where: { id: session.user.id },
                data: dataToUpdate
            });


            return new Response("User updated!", { status: 200 })
        }



    } catch (error: any) {
        return new Response(`${error.message}`, { status: 500 })
    }
};
