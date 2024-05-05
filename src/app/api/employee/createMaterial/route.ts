import { getAuthSession } from "../../../../lib/auth"
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

        const learningMaterials = await prisma.learningMaterial.create({
            data: {
                title,
                description,
                //@ts-ignore
                material,
                thumbnail: "https://utfs.io/f/cb4fb13b-9590-4c27-a0c3-7cf4a416c854-jw91ob.png",
                authorId: loggedIn?.id,
                communityId: loggedIn?.Community?.id as string
            }
        })

        await prisma.employeeActivityHistory.create({
            data:{
              type: "LEARNINGMATERIALS",
              employeeId: session.user.id,
              typeOfActivity: `Added ${learningMaterials.title} to Learning materials.`
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