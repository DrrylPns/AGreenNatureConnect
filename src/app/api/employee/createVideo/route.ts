import { getAuthSession } from "../../../../lib/auth"
import prisma from "@/lib/db/db"
import { CreateMaterialSchema } from "@/lib/validations/employee/materials"
import { CreateVideoSchema } from "@/lib/validations/employee/videos"
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

        // if (loggedIn?.role !== "EMPLOYEE" || !session?.user) {
        //     return new Response("Unauthorized", { status: 401 })
        // }

        const body = await req.json()

        const { title, description, video } = CreateVideoSchema.parse(body)

        const videoTut = await prisma.videoTutorial.create({
            data: {
                title,
                description,
                video: video as string,
                thumbnail: "https://utfs.io/f/1e02af5a-90d0-4c57-b119-1b13c65c1f35-57am8q.jpg",
                authorId: loggedIn?.id as string,
                communityId: loggedIn?.Community?.id as string,
                isApproved: "APPROVED",
            }
        })

        await prisma.employeeActivityHistory.create({
            data: {
                type: "LEARNINGMATERIALS",
                employeeId: session?.user.id as string,
                videoId: videoTut.id,
                typeOfActivity: `Added ${videoTut.title} to Video tutorial.`
            }
        })

        return new Response('Successfully created video tutorial.')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response('Could not create video tutorial' + error, { status: 500 })
    }
}