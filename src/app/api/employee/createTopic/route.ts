import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db/db"
import { TopicSchema } from "@/lib/validations/topicPostScema"
import { z } from "zod"

//export async function POST(req: NextApiRequest, res:NextApiResonse) {
export async function POST(req: Request) {
    try {
        // get session
        const session = await getAuthSession()

        // validate user
        if (!session?.user || session?.user.role !== "STAFF") {
            return new Response("Unauthorized", { status: 401 })
        }

        // request body
        const body = await req.json()

        // parse body
        const { name } = TopicSchema.parse(body)

        // does the input exist in the current database?
        const topicExists = await prisma.topic.findFirst({
            where: {
                name: name
            }
        })

        // if it is throw error
        if (topicExists) {
            return new Response("The topic already exists", { status: 409 })
        }

        // if it passes all error handling create it in the db
        const topic = await prisma.topic.create({
            data: {
                name,
                creatorId: session.user.id
            }
        })

        // return new Response (topic name)
        return new Response(topic.name)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 422 })
        }

        return new Response('Could not create topic', { status: 500 })
    }
}