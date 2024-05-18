import { getAuthSession } from "../../../lib/auth";
import prisma from "@/lib/db/db";
import { RegisterSchema } from "@/lib/validations/registerUserSchema";
import { z } from "zod"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if (session?.user) {
            return new Response("Error: Already Logged In", { status: 403 })
        }

        const body = await req.json();

        const {
            email,
            password,
            birthday,
            confirmPassword,
            community,
            terms,
        } = RegisterSchema.parse(body)

        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userExists) {
            return new Response("Email already exists. Please use a different one.", { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        if (community === "Others") {
            community === null

            await prisma.user.create({
                data: {
                    email,
                    hashedPassword,
                    birthday,
                }
            });
        } else {
            let existingCommunity = await prisma.community.findFirst({
                where: {
                    name: community
                }
            });

            if (!existingCommunity) {
                existingCommunity = await prisma.community.create({
                    data: {
                        name: community,
                        address: ''
                    }
                });
            }

            await prisma.user.create({
                data: {
                    email,
                    hashedPassword,
                    birthday,
                    barangay: community,
                    // Community: {
                    //     connect: {
                    //         name: community
                    //     }
                    // }
                }
            });
        }

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return new NextResponse("Success!", { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid POST request data passed", { status: 422 })
        }
        return new Response(`${error}, Could not create an account`, { status: 500 });
    }
}