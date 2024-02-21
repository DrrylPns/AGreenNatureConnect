"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/Ui/Avatar';
import { Separator } from '@/app/components/Ui/Separator';
import { Image } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Reaction = {
    id: string;
    type: string;
    createdAt: Date;
    user: User
};

type User = {
    id: string;
    name: string;
    lastName: string;
    image: string;
    username: string;
};

export const LeafReactList = () => {
    const { isLoading, isError, data: reactors } = useQuery({
        queryKey: ['reactors'],
        queryFn: async () => {
            try {
                const { data } = await axios.post("/api/user/getReactions", {
                    type: "Leaf",
                })
                return data as Reaction[];
            } catch (error: any) {
                throw new Error(`Error fetching communities: ${error.message}`);
            }
        }
    })

    if (isLoading) return <>Loading...</>

    if (isError) return <>Error fetching Reactors...</>

    if (reactors.length === 0) return <div className="flex flex-col items-center">
        <Image
            alt="No result found."
            className="w-72 h-72"
            src="../../../../../../undraw/no-result-found.svg"
        />
        <div className="text-muted-foreground">
            No reactors yet.
        </div>
    </div>;

    return (
        <div>
            <h2>Users who reacted with greenify:</h2>
            <ul>
                {reactors?.map((reactor) => (
                    <div className='flex gap-3 my-4'>
                        <Avatar>
                            <AvatarImage src={reactor.user.image} alt={`${reactor.user.username}'s profile picture`} />
                            <AvatarFallback>{reactor.user.username}'s profile picture</AvatarFallback>
                        </Avatar>
                        <div className='w-full'>
                            <div className='flex flex-col w-full'>
                                <div key={reactor.id}>{reactor.user.name} {" "} {reactor.user.lastName}</div>
                                <div className='text-muted-foreground text-sm'>{reactor.user.username}</div>

                            </div>
                            <Separator className='mt-2' />
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}
