"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CommunityCard } from "./_components/CommunityCard";

export type CommunityPageProps = {
    id: string;
    name: string;
}

const CommunityPage = () => {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['communities'],
        queryFn: async () => {
            const {data} = await axios.get("/api/admin/community")
            console.log(data)
            return data as CommunityPageProps[]
        }
    })

    if(isError) return <p>Error fetching communities</p>

    if(isLoading) return <p>Fetching communities...</p>

    return (
        <section className='flex flex-col justify-center items-center p-12'>
        <div className='font-extrabold text-[32px] border-b mb-7'>
            Communities
        </div>

        <div>
            {data?.map((community) => (
                <CommunityCard key={community.id} {...community} />
            ))}
        </div>
    </section>
    )
}

export default CommunityPage