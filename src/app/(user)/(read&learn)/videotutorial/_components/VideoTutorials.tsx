"use client"
import { Separator } from '@/app/components/Ui/Separator';
import { Card, CardFooter, Image } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { EnumValues } from 'zod';

type Community = {
    id: string;
    name: string
    createdAt: Date;
    updatedAt: Date;
    VideoTutorial: VideoTutorial[];
}

type VideoTutorial = {
    id: string;
    title: string;
    video: string;
    description: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    isApproved: EnumValues;
    author: User;
    community: Community;
}

type User = {
    id: string;
    name?: string;
    lastName?: string;
    VideoTutorial: VideoTutorial[];
};

export const VideoTutorials = ({ selectedCommunity }: any) => {
    const { isLoading, isError, data: communities } = useQuery({
        queryKey: ['videoTutorials-approved', selectedCommunity],
        queryFn: async () => {
            try {
                const { data } = await axios.get("/api/user/getVT");
                return data as Community[];
            } catch (error: any) {
                throw new Error(`Error fetching communities: ${error.message}`);
            }
        }
    })

    if (isLoading) return <>Fetching Learning Materials...</>
    if (isError) return <>Error fetching Learning Materials...</>

    if (!communities || communities.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <Image
                    alt="No result found."
                    className="w-96 h-96"
                    src="../../../../../../undraw/no-result-found.svg"
                />
                <div className="text-muted-foreground">
                    No results found for the selected community.
                </div>
            </div>
        );
    }

    const filteredVideoTutorials =
        selectedCommunity === null || selectedCommunity === ""
            ? communities
            : communities.filter((community) => community.id === selectedCommunity);

    if (filteredVideoTutorials.every((community) => community.VideoTutorial.length === 0)) {
        console.log('No video tutorials found for the selected community.');
        return (
            <div className="flex flex-col items-center">
                <Image
                    alt="No result found."
                    className="w-96 h-96"
                    src="../../../../../../undraw/no-result-found.svg"
                />
                <div className="text-muted-foreground">
                    No results found for the selected community.
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            {filteredVideoTutorials.map((community) => (
                <div key={community.id} className="">
                    {community.VideoTutorial.map((video) => (
                        <div key={video.id} className='lg:flex lg:flex-row lg:gap-8'>
                            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 rounded-lg shadow-md border border-[#a2a2a2]/30">
                                <Image
                                    removeWrapper
                                    alt="blog app background"
                                    className="z-0 w-full h-full object-cover"
                                    src={video.thumbnail as string}
                                />
                                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
                                    <div className="flex flex-grow gap-2 items-center">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-white/60">A Video Tutorial By</p>
                                            <p className="text-sm text-white/60 underline">{community.name} Community</p>
                                        </div>
                                    </div>
                                    <a target="_blank" href={video.video} className="text-white">
                                        View Tutorial
                                    </a>
                                </CardFooter>
                            </Card>

                            <div className="max-lg:mt-3">
                                <p className="text-lg font-bold">{video.title}</p>
                                <p className='text-muted-foreground'>By {video.author.name} {video.author.lastName}</p>
                                <p className='text-muted-foreground text-[15px] mt-3'>{video.description}</p>
                            </div>

                            <Separator className='lg:hidden block my-3' />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
