"use server"
import { getAuthSession } from "@/lib/auth"
import prisma from "@/lib/db/db"
import { revalidatePath } from "next/cache"

export const search = async(query:string)=>{
    try {
        const product = await prisma.product.findMany({
            where:{
                name:{
                    contains: query
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
                            contains: query
                        }
                    },
                    {
                        content:{
                            string_contains: query
                        }
                    }
                ]
            }
        })
        
        return {post,product}
    } catch (error) {
        return { error: error }
    }
}
