import prisma from "@/lib/db/db"
import { NextRequest } from "next/server";

//Getting all products
export async function GET(req: NextRequest) {
    try {

        const others = await prisma.product.findMany({
            where:{
              isFree: {
                  equals: false
              },
              status:{
                  equals: "APPROVED"
              },
              category:{
                  equals:"Others"
              },
              
            },
            include:{
              community: true,
              variants: true
            }
           
          })
        return new Response(JSON.stringify(others), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}
