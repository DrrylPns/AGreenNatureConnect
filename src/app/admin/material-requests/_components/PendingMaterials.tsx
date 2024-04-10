"use client"
import { LearningMaterial } from '@prisma/client';
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

type LearningMaterials = {
    id: string;
    title: string;
    material: string;
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

export const PendingMaterials = () => {
    const [status, setStatus] = useState('');

    const { isLoading, isError, data: materials } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const { data } = await axios.get("/api/user/getMaterials/pending");
                return data as LearningMaterials[];
            } catch (error: any) {
                throw new Error(`Error fetching communities: ${error.message}`);
            }
        }
    })

    if (isLoading) return <>Fetching materials...</>

    if (isError) return <>Error fetching materials...</>

    const updatedMaterialStatus = async (materialId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/admin/materials', {
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
                description: `Successfully ${newStatus} the blog`,
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

            {materials.map((material) => (
                //@ts-ignore
                <div>{material.isApproved === "PENDING" ? (
                    <Card shadow="sm" className="shadow-md border border-[#a2a2a2]/30 rounded-lg" key={material.id}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={material.title}
                                className="w-full object-cover h-[140px] shadow-md rounded-lg"
                                src={material.thumbnail}
                            />
                        </CardBody>
                        <CardFooter className="text-sm flex flex-col text-start justify-start items-start gap-2">
                            <b className="text-zinc-700">{material.title}</b>
                            <p className="text-[#868686]">Upload Date: {formatDate(material.createdAt)}</p>
                            <p className="text-[#868686]">Author: {" "}
                                <span className="underline">
                                    {material.author.name} {" "} {material.author.lastName}
                                </span>
                            </p>

                            <Separator className="bg-zinc-400" />

                            <div className="flex gap-3 justify-between w-full items-center">
                                <div>
                                    <Button variant="ghost" className="hover:bg-transparent/10">
                                        <a target='_blank' href={material.material}>
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
                                                    This action will decline the requested material of the employee.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-rose-500 hover:bg-rose-500/80">

                                                    Cancel

                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-[#099073] hover:bg-[#099073]/80"
                                                    onClick={() => handleDecline(material.id)}
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
                                                    This action will approve the requested blog of the material and it will be seen in the blog section .
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-rose-500 hover:bg-rose-500/80">

                                                    Cancel

                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-[#099073] hover:bg-[#099073]/80"
                                                    onClick={() => handleApprove(material.id)}
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
