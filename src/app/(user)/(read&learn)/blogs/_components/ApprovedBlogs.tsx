"use client"
import EditorOutput from "@/app/components/(user)/EditorOutput";
import { Separator } from "@/app/components/Ui/Separator";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { EnumValues } from "zod";

type Community = {
    id: string;
    name: string
    createdAt: Date;
    updatedAt: Date;
    blogs: Blog[];
}

type Blog = {
    id: string;
    title: string;
    content: any;
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
    Blog: Blog[];
};

type TabBlogsProps = {
    selectedCommunity: string;
    communities: Community[] & {
        Blog: Blog & {
            author: User
        }
    }
}

export const ApprovedBlogs: React.FC<TabBlogsProps> = ({
    communities,
    selectedCommunity,
}) => {
    // const { isLoading, isError, data: communities } = useQuery({
    //     queryKey: ['get-approved-blogs', selectedCommunity],
    //     queryFn: async () => {
    //         try {
    //             const { data } = await axios.get("/api/user/getBlogs");
    //             return data as Community[];
    //         } catch (error: any) {
    //             throw new Error(`Error fetching communities: ${error.message}`);
    //         }
    //     }
    // })

    // if (isLoading) return <>Fetching Blogs...</>
    // if (isError) return <>Error fetching Blogs...</>

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

    if (filteredVideoTutorials.every((community) => community.blogs.length === 0)) {
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
                <div key={community.id} className="h-full">
                    {community.blogs.map((blog) => (
                        <div key={blog.id} className='flex flex-col md:flex-row gap-11 h-full'>
                            <Card isFooterBlurred className="md:w-[50%] h-[300px] col-span-12 sm:col-span-7 rounded-lg shadow-md border border-[#a2a2a2]/30 p-0 my-2">
                                <Image
                                    removeWrapper
                                    alt="blog app background"
                                    className="z-0 w-full h-full object-cover"
                                    src={blog.thumbnail as string}
                                />
                                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
                                    <div className="flex flex-grow gap-2 items-center">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-white/60">A Blog By</p>
                                            <p className="text-sm text-white/60 underline">{community.name} Community</p>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>

                            <div className="max-lg:mt-3 md:w-[50%]">
                                <p className="text-lg font-bold">{blog.title}</p>
                                <p className='text-muted-foreground'>By {blog.author.name} {blog.author.lastName}</p>

                                <p className='text-muted-foreground text-[15px] mt-3'>
                                    <EditorOutput key={blog.id} content={blog.content} />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>

    )
}


// <div className="">
//                         <p className="text-lg font-bold">{blog.title}</p>
//                         <p>By {blog.author.name} {" "} {blog.author.lastName}</p>
//                         <EditorOutput key={blog.id} content={blog.content} />
//                     </div>