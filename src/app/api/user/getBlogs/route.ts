import prisma from '@/lib/db/db'

export async function GET() {
    // const url = new URL(req.url)

    try {
        // const page = parseInt(url.searchParams.get('page') ?? '1', 10);
        // const perPage = parseInt(url.searchParams.get('per_page') ?? '5', 10);

        // const skip = (page - 1) * perPage;

        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            // skip,
            // take: perPage,
            include: {
                author: true,
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