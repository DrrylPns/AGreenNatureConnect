import prisma from "@/lib/db/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
   
    try {
        const query = searchParams.get("query");
        const product = await prisma.product.findMany({
            where:{
                name:{
                    contains: query ? query : undefined
                },
                status:{
                    equals: "APPROVED"
                },
                variants:{
                    some: {
                        variant: {
                            not: 0
                        }
                    }
                }
            }
        });
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
            }
        });
        return new Response(JSON.stringify({product, posts}))
    } catch (error) {
        return new Response(JSON.stringify({error}))
    }
   
}