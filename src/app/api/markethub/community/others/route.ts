import prisma from "@/lib/db/db"
import {  NextApiResponse } from "next";

//Getting all products by communityId
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const {searchParams} = new URL(req.url);
        const communityId = searchParams.get("communityId");
        const others = await prisma.product.findMany({
            where:{
              communityId: communityId ? communityId : undefined,
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
              Stock: true
            }
           
          })
        return new Response(JSON.stringify(others))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
    