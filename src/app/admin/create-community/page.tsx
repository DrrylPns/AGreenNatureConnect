import prisma from "@/lib/db/db"
import { CreateCommunity } from "./_components/CreateCommunity"

const CreateCommunityPage = async () => {

    const user = await prisma.user.findMany({
        where:{
            role: "EMPLOYEE"
        }
    })

    return (
        <section className='flex flex-col justify-center p-12 md:max-w-2xl mx-auto gap-5'>
            <div className='border-b font-bold'>
                Create a community
            </div>

            <CreateCommunity user={user}/>
        </section>
    )
}

export default CreateCommunityPage