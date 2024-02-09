import prisma from '@/lib/db/db'

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
                community: true,
            },
        })

        return new Response(JSON.stringify(blogs), {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        return new Response('Could not fetch posts', { status: 500 })
    }
}