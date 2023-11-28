import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommunityCard } from "./_components/CommunityCard";
import { Community, User } from "@prisma/client";
import prisma from "@/lib/db/db";

export type CommunityWithUser = {
    community: Community & {
        user: User
    }
}

const CommunityPage = async () => {
    // const { data, isLoading, isError } = useQuery({
    //     queryKey: ['communities'],
    //     queryFn: async () => {
    //         try {
    //             const { data } = await axios.get("/api/admin/community");
    //             console.log(data);
    //             return data as CommunityWithUser[];
    //         } catch (error: any) {
    //             throw new Error(`Error fetching communities: ${error.message}`);
    //         }
    //     }
    // })

    // if (isError) return <p>Error fetching communities</p>

    // if (isLoading) return <p>Fetching communities...</p>

    const communities = await prisma.community.findMany({
        include: {
            user: true
        }
    })

    return (
        <section className='flex flex-col justify-center items-center p-12'>
            <div className='font-extrabold text-[32px] border-b mb-7'>
                Communities
            </div>

            <div>
                {communities?.map((community) => (
                    <CommunityCard
                        key={community.id}
                        name={community.name}
                        user={community.user}
                    />
                ))}
            </div>
        </section>
    )
}

export default CommunityPage