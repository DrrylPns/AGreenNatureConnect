"use client"
import { LearningMaterial, VideoTutorial } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { EnumValues } from 'zod';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/components/Ui/alert-dialog";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/Ui/Dialog";
import { Separator } from "@/app/components/Ui/Separator";
import { Button } from "@/app/components/Ui/Button";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatDate } from "@/lib/utils";
import EditorOutput from '@/app/components/(user)/EditorOutput';
import { toast } from '@/lib/hooks/use-toast';

type VideoTutorials = {
    id: string;
    title: string;
    video: string;
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
    VideoTutorial: VideoTutorial[]
};

type Community = {
    id: string;
    name: string;
    VideoTutorial: VideoTutorial[]
};

export const PendingVideo = () => {
    const [status, setStatus] = useState('');

    const { isLoading, isError, data: videos } = useQuery({
        queryKey: ['videos'],
        queryFn: async () => {
            try {
                const { data } = await axios.get("/api/user/getVideoTutorials/pending");
                return data as VideoTutorials[];
            } catch (error: any) {
                throw new Error(`Error fetching videos: ${error.message}`);
            }
        }
    })

    if (isLoading) return <>Fetching videos...</>

    if (isError) return <>Error fetching videos...</>

    const updatedMaterialStatus = async (materialId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/admin/updateVideo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: materialId,
                    status: newStatus,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setStatus(newStatus);

            toast({
                description: `Successfully ${newStatus} the video`,
                variant: "default"
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000)

        } catch (error) {
            console.error('Error:', error);
            toast({
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    const handleApprove = async (materialId: string) => {
        await updatedMaterialStatus(materialId, "APPROVED")
    }

    const handleDecline = async (materialId: string) => {
        await updatedMaterialStatus(materialId, "DECLINED")
    }

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-11">

            {videos.map((video) => (
                //@ts-ignore
                <div>{video.isApproved === "PENDING" ? (
                    <Card shadow="sm" className="shadow-md border border-[#a2a2a2]/30 rounded-lg" key={video.id}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={video.title}
                                className="w-full object-cover h-[140px] shadow-md rounded-lg"
                                src={video.thumbnail as string}
                            />
                        </CardBody>
                        <CardFooter className="text-sm flex flex-col text-start justify-start items-start gap-2">
                            <b className="text-zinc-700">{video.title}</b>
                            <p className="text-[#868686]">Upload Date: {formatDate(video.createdAt)}</p>
                            <p className="text-[#868686]">Author: {" "}
                                <span className="underline">
                                    {video.author.name} {" "} {video.author.lastName}
                                </span>
                            </p>

                            <Separator className="bg-zinc-400" />

                            <div className="flex gap-3 justify-between w-full items-center">
                                <div>
                                    <Button variant="ghost" className="hover:bg-transparent/10">
                                        <a target='_blank' href={video.video}>
                                            Click to view
                                        </a>
                                    </Button>
                                </div>

                                <div className="space-x-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button variant={"destructive"}>
                                                Decline
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will decline the requested blog of the employee.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-rose-500 hover:bg-rose-500/80">

                                                    Cancel

                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-[#099073] hover:bg-[#099073]/80"
                                                    onClick={() => handleDecline(video.id)}
                                                >

                                                    Continue

                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button variant={"newGreen"}>
                                                Approve
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will approve the requested blog of the employee and it will be seen in the blog section .
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-rose-500 hover:bg-rose-500/80">

                                                    Cancel

                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-[#099073] hover:bg-[#099073]/80"
                                                    onClick={() => handleApprove(video.id)}
                                                >

                                                    Continue

                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>

                            </div>

                        </CardFooter>
                    </Card>
                ) :
                    <div>
                        No Results Found.
                    </div>
                }</div>
            ))}
        </div>
    )
}
