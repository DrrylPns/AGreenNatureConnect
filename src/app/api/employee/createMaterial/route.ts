import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { CreateMaterialSchema } from "@/lib/validations/employee/materials"
import { z } from "zod"

export async function POST(req: Request) {
    try {

        const session = await getAuthSession()

        const loggedIn = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        if (loggedIn?.role !== "EMPLOYEE" || !session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        const body = await req.json()

        const { title, description, material } = CreateMaterialSchema.parse(body)

        await prisma.learningMaterial.create({
            data: {
                title,
                description,
                //@ts-ignore
                material,
                thumbnail: "https://utfs.io/f/fdf3292e-e255-4a48-82b0-df1d63f321cf-bne8e7.png",
                authorId: loggedIn?.id,
                communityId: loggedIn?.Community?.id as string
            }
        })

        return new Response('Successfully created learning material.')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response('Could not create material' + error, { status: 500 })
    }
}