import prisma from "@/lib/db/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
   
    try {
        const query = searchParams.get("query");
        const posts = await prisma.post.findMany({
            where:{
                OR: [
                    {
                        title:{
                            contains: query ? query : undefined
                        }
                    },
                    {
                        topic:{
                            name:{
                                contains: query ? query : undefined
                            }
                        }
                    }
                ]
            },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
                likes: true,
                topic: true
            },
            orderBy: {
                createdAt: 'desc'
            },
        })
        return new Response(JSON.stringify({posts}))
    } catch (error) {
        return new Response(JSON.stringify({error}))
    }
   
}