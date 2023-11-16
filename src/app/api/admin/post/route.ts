import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'

export async function GET(req: Request) {

    const session = await getAuthSession()

    if(session?.user.role === "USER" || !session?.user) return new Response ("Error: Unauthorized", {status: 401})

    try {
        
        const posts = await prisma.post.count()

        return new Response(JSON.stringify(posts))
    } catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}