"use client"
import EditorOutput from "@/app/components/(user)/EditorOutput";
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { LearningMaterial } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { EnumValues } from "zod";


type LearningMaterials = {
    id: string;
    title: string;
    material: string;
    description: string;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
    isApproved: EnumValues;
    author: User;
    community: Community;
};

type User = {
    id: string;
    name?: string;
    lastName?: string;
    LearningMaterial: LearningMaterial[];
};

type Community = {
    id: string;
    name: string;
    LearningMaterials: LearningMaterial[];
};

export const ApprovedMaterials = () => {

    const { isLoading, isError, data: materials } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const { data } = await axios.get("/api/user/getMaterials/approved");
                return data as LearningMaterials[];
            } catch (error: any) {
                throw new Error(`Error fetching communities: ${error.message}`);
            }
        }
    })

    if (isLoading) return <>Fetching Learning Materials...</>

    if (isError) return <>Error fetching Learning Materials...</>

    if (materials.length === 0) return <div className="flex flex-col items-center">
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
            {materials.map((materials) => (
                <div className="grid grid-cols-2 grid-rows-1 grid-flow-row gap-2 space-x-7">
                    <div>
                        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 rounded-lg shadow-md border border-[#a2a2a2]/30">
                            <Image
                                removeWrapper
                                alt="blog app background"
                                className="z-0 w-full h-full object-cover"
                                src={materials.thumbnail}
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 shadow-md">
                                <div className="flex flex-grow gap-2 items-center">
                                    <Image
                                        alt="Breathing app icon"
                                        className="rounded-full w-10 h-11 bg-black"
                                        src="/images/breathing-app-icon.jpeg"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-white/60">A Learning Material By</p>
                                        <p className="text-sm text-white/60 underline">{materials.community.name} {" "} Community</p>
                                    </div>
                                </div>
                                {/* <Button radius="full" size="sm"> */}
                                <a target="_blank" key={materials.id} href={materials.material} className="text-white">
                                    View PDF
                                </a>
                                {/* </Button> */}
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="">
                        <p className="text-lg font-bold">{materials.title}</p>
                        <p className="text-muted-foreground">By {materials.author.name} {" "} {materials.author.lastName}</p>
                        <p className="text-muted-foreground text-[15px] mt-3">{materials.description}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}
