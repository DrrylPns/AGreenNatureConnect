"use client"
import EditorOutput from "@/app/components/(user)/EditorOutput";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Blog = {
    id: string;
    title: string;
    content: any;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    community: Community;
};

type User = {
    id: string;
    name?: string;
    lastName?: string;
    Blog: Blog[];
};

type Community = {
    id: string;
    name: string;
    blogs: Blog[];
};

export const ApprovedBlogs = () => {

    const { isLoading, isError, data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const { data } = await axios.get("/api/user/getBlogs/approved");
                return data as Blog[];
            } catch (error: any) {
                throw new Error(`Error fetching communities: ${error.message}`);
            }
        }
    })

    if (isLoading) return <>Fetching Blogs...</>

    if (isError) return <>Error fetching Blogs...</>

    if (blogs.length === 0) return <div className="flex flex-col items-center">
        <Image
            alt="No result found."
            className="w-96 h-96"
            src="../../../../../../undraw/no-result-found.svg"
        />
        <div className="text-muted-foreground">
            No results found.
        </div>
    </div>;


    return (
        <div className="max-w-full gap-5 grid grid-cols-1 grid-rows-1 px-8 mb-11">
            {blogs.map((blog) => (
                <div className="grid grid-cols-2 grid-rows-1 grid-flow-row gap-2 space-x-7">
                    <div>

                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 rounded-lg shadow-md border border-[#a2a2a2]/30">
                            <Image
                                removeWrapper
                                alt="blog app background"
                                className="z-0 w-full h-full object-cover"
                                src={blog.thumbnail}
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
                                <div className="flex flex-grow gap-2 items-center">
                                    <Image
                                        alt="Breathing app icon"
                                        className="rounded-full w-10 h-11 bg-black"
                                        src="/images/breathing-app-icon.jpeg"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-white/60">A Blog By</p>
                                        <p className="text-sm text-white/60 underline">{blog.community.name} {" "} Community</p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="">
                        <p className="text-lg font-bold">{blog.title}</p>
                        <p>By {blog.author.name} {" "} {blog.author.lastName}</p>
                        <EditorOutput key={blog.id} content={blog.content} />
                    </div>
                </div>
            ))}

        </div>

    )
}
