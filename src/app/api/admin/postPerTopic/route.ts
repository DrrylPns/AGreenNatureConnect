import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'

export async function GET(req: Request) {

    const session = await getAuthSession()

    if(session?.user.role === "USER" || !session?.user) return new Response ("Error: Unauthorized", {status: 401})

    try {
        const postCounts = await prisma.topic.findMany({
            include: {
                posts: true,
                _count: {
                    select: {
                        posts: true,
                    }
                }
            }
        })

          const sortPostPerTopic = postCounts.sort((a,b) => b._count.posts - a._count.posts)

          sortPostPerTopic.forEach((topic) => {
            // SQL QRY IN PlanetScale console

            //     SELECT
            //     t.id AS topicId,
            //     t.name AS topicName,
            //     COUNT(p.id) AS postCount
            // FROM
            //     Topic t
            // LEFT JOIN
            //     Post p ON t.id = p.topicId
            // GROUP BY
            //     t.id, t.name;
          });

        return new Response(JSON.stringify(sortPostPerTopic))
    } catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}