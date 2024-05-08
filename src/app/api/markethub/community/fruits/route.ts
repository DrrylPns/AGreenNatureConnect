import prisma from "@/lib/db/db"
import {  NextApiResponse } from "next";

//Getting all products by communityId
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const {searchParams} = new URL(req.url);
        const communityId = searchParams.get("communityId");
        const fruits = await prisma.product.findMany({
            where:{
              communityId: communityId ? communityId : undefined,
              isFree: {
                  equals: false
              },
              status:{
                  equals: "APPROVED"
              },
              category:{
                  equals:"Fruits"
              },
              
            },
            include:{
              community: true,
              Stock: true
            }
           
          })
        return new Response(JSON.stringify(fruits))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
    