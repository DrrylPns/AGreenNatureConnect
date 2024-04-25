import prisma from "@/lib/db/db";

//Getting unique post based on postId
export async function GET(req: Request) {
    const userId = req.url.split("userPost/")[1]?.split("?")[0];
    try {
        const {searchParams} = new URL(req.url);
        const param = searchParams.get("cursor");
        const limit = 5
        const getPost = await prisma.post.findMany({
            cursor: param ?{
                id:param
               }: undefined,
            take: limit,
            skip: param === '' ? 0 : 1,
            where:{
                author:{
                    id: userId
                }
            },
            include:{
                author: true,
                comments:{
                    include:{
                        author: true,
                        replyOnComent: true
                    }
                },
                likes: true,
                topic: true,
            }
        })
    
        const myCursor = getPost.length === limit ? getPost[getPost.length - 1].id : undefined;
        return new Response(JSON.stringify({getPost, nextId: myCursor, userId}))
    } catch (error) {
        return new Response(JSON.stringify({error}))
    }
   
}