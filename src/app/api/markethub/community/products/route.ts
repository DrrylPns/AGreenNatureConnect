import prisma from "@/lib/db/db"
import {  NextApiResponse } from "next";

//Getting all products by communityId
export async function GET(req: Request, res: NextApiResponse) {
    try {
        const {searchParams} = new URL(req.url);
        const communityId = searchParams.get("communityId");
        const allProducts = await prisma.product.findMany({
            where:{
              communityId: communityId ? communityId : undefined,
              isFree: {
                  equals: false
              },
              status:{
                  equals: "APPROVED"
              },
            },
            include:{
              community: true,
              variants: true
            }
           
          })
        return new Response(JSON.stringify(allProducts))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
    