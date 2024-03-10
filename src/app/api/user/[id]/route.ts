import prisma from "@/lib/db/db";

//Getting all 
export async function GET(req: Request) {
    const postId = req.url.split("user/")[1];
    try {

        const user = await prisma.user.findUnique({
            where:{
                id: postId
            },
            include:{
                posts: true,
                comments: true,
            },
        })
        return new Response(JSON.stringify(user), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({message: 'Error:', error}))
    }
}