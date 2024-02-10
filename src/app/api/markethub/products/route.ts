import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";

//Getting all products
export async function GET(req: NextRequest) {
    try {

        const getAllProducts = await prisma.product.findMany({
            where:{
                isFree: {
                    equals: false
                },
                status:{
                    equals: 'APPROVED'
                },
                category:{
                    equals:"Vegetables"
                },
                variants:{
                    some: {
                        variant: {
                            not: 0
                        }
                    }
                }
            },

            include:{
               variants: true,
               community: true
            }
        })
       
        return new Response(JSON.stringify(getAllProducts), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}
