import { getAuthSession } from "../../../../lib/auth";
import prisma from "@/lib/db/db";
import { ChangeGenderSchema } from "@/lib/validations/changeGenderSchema";
import { z } from "zod";

export async function POST(req: Request) {
    const session = await getAuthSession()

    if (!session) {
        return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { gender } = ChangeGenderSchema.parse(body)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            }
        })

        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                gender
            }
        })

        return new Response(gender)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response("Internal server error", { status: 500 })
    }
}