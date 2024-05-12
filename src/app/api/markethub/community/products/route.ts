import prisma from "@/lib/db/db"
import {  NextApiResponse } from "next";

//Getting all products by communityId
export async function POST(req: Request, res: NextApiResponse) {
        const {searchParams} = new URL(req.url);
        const { category } = await req.json()
    try {
        const communityId = searchParams.get("communityId");
        console.log(communityId)
        const allProducts = await prisma.product.findMany({
            where:{
              communityId: communityId ? communityId : undefined,
              isFree: {
                  equals: false
              },
              status:{
                  equals: "APPROVED"
              },
              category:{
                equals: category === "All" ? undefined : category
              },
              quantity:{
                  gte: 1
              }
            },
            include:{
              Stock: true,
              community: true,
              reviews: true,
          }
          })
          console.log(allProducts)
        return new Response(JSON.stringify(allProducts))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error:', error }))
    }
}
    