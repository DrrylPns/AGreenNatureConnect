import { VideoTutorials } from "@/app/(user)/(read&learn)/videotutorial/_components/VideoTutorials";
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"

export async function GET() {
    try {
        // const session = await getAuthSession()

        // const loggedInUser = await prisma.user.findFirst({
        //     where: {
        //         id: session?.user.id,
        //     },
        //     include: {
        //         Community: true,
        //     },
        // });

        const communities = await prisma.community.findMany({
            include: {
                VideoTutorial: {
                    include: {
                        author: true
                    }
                }
            }
        });

        return new Response(JSON.stringify(communities));
    } catch (error) {
        return new Response('Could not fetch communities', { status: 500 })
    }
}