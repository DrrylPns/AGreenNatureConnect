import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'
import { z } from 'zod'

export async function GET(req: Request) {
    // const url = new URL(req.url)

    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
            },
        })

        return new Response(JSON.stringify(blogs))
    } catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}