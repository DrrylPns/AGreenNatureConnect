import prisma from "@/lib/db/db"
import {  NextApiResponse } from "next";

//Getting all products by communityId
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const {searchParams} = new URL(req.url);
        const communityId = searchParams.get("communityId");
        const vegetables = await prisma.product.findMany({
            where:{
              communityId: communityId ? communityId : undefined,
              isFree: {
                  equals: false
              },
              status:{
                  equals: "APPROVED"
              },
                quantity:{
                    gte: 1
                },
              category:{
                  equals:"Vegetables"
              },
              
            },
            include:{
              community: true,
              Stock: true
            }
           
          })
        return new Response(JSON.stringify(vegetables))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
    