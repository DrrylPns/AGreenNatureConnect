import { getAuthSession } from '../../../../../lib/auth';
import prisma from '@/lib/db/db'

export async function GET() {
    try {
        const session = await getAuthSession()

        const loggedInUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id
            },
            include: {
                Community: true
            }
        })

        const community = await prisma.community.findFirst({
            where: {
                id: loggedInUser?.Community?.id
            }
        })

        const blogs = await prisma.article.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
                community: true,
            },
            where: {
                isApproved: "DECLINED",
                communityId: community?.id
            }
        })

        return new Response(JSON.stringify(blogs), {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        return new Response('Could not fetch articles', { status: 500 })
    }
}