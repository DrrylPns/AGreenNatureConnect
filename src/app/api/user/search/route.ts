import prisma from "@/lib/db/db"
import { NextRequest } from "next/server"

export async function GET(req: Request){
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
        })
        const post = await prisma.post.findMany({
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
        })
        return new Response(JSON.stringify({ product, post }))
    } catch (error) {
        return { error: error }
    }
}
