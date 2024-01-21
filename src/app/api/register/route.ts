import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db";
import { RegisterSchema } from "@/lib/validations/registerUserSchema";
import { z } from "zod"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

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

        const user = await prisma.user.create({
            data: {
                email,
                hashedPassword,
                birthday,
                Community: {
                    create: {
                        name: community
                    }
                }
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response("Invalid POST request data passed", { status: 422 })
        }
        return new Response("Could not create a user, please try again later!", { status: 500 });
    }
}