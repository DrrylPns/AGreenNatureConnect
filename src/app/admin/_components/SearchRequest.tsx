"use client"

import { Button, buttonVariants } from "@/app/components/Ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/app/components/Ui/Dropdown-Menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/Ui/alert-dialog";
import { toast } from "@/lib/hooks/use-toast";
import { cn, formatDate } from "@/lib/utils";
import { Community, ConsignorApplicants, UrbanFarmApplicatants } from "@prisma/client";
import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react';
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { approvedConsignor, createCommunity, fetchNumberOfConsignor, handleCommunity } from "../../../../actions/community";
import useSpeechRecognition from "@/lib/hooks/useSpeechRecognition";
import Image from "next/image";
import { ConsignorApplicantsExtended } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface SearchEmployeesProps {
    // employees: Array<User & { Community: Community | null }>;
   request: ConsignorApplicantsExtended[]
}

const SearchRequest: React.FC<SearchEmployeesProps> = ({
    request,
    
}) => {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    // const {
    //     hasRecognitionSupport,
    //     isListening,
    //     startListening,
    //     stopListening,
    //     text,
    // } = useSpeechRecognition()

  

    const isEmployeeSelected = (community: ConsignorApplicantsExtended) =>
        selectedNames.length === 0 || selectedNames.includes(community.urbanFarm.name || "");

    const handleValueChange = (value: string | string[]) => {
        const names = Array.isArray(value) ? value : [value];
        setSelectedNames(names);
    };

    return (
        <>
            <div className="flex justify-between space-x-2 mt-2">
                <MultiSelect
                    className="max-w-full sm:max-w-xs"
                    onValueChange={handleValueChange}
                    placeholder="Search Communities..."
                >
                    {request.map((req) => (
                        <MultiSelectItem key={req.id} value={req.urbanFarm.name || ""}>
                            {req.urbanFarm.name}
                        </MultiSelectItem>
                    ))}
                </MultiSelect>

                {/* <div>
                    {hasRecognitionSupport ? (
                        <>
                            <Button onClick={startListening}>Start Listening</Button>
                            <Button onClick={stopListening}>Stop Listening</Button>

                            {isListening && (
                                <div>Your browser is currently listening</div>
                            )}
                            {text}
                        </>
                    ) : (
                        <>
                            <h1>Your browser has no speech recognition support</h1>
                        </>
                    )}
                </div> */}

                {/* <div className="flex gap-3 w-full justify-end">
                    {isArchivePanel ? (
                        <>
                            <Link className={cn(buttonVariants({
                                variant: "outline"
                            }),
                                "w-full"
                            )}
                                href="/communities"
                            >
                                Active Urban Farms
                            </Link>
                        </>
                    ) :
                        (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-end">
                                <Link className={cn(buttonVariants({
                                    variant: "outline"
                                }), ""
                                )}
                                    href="/archived-communities"
                                >
                                    Archived Urban Farm
                                </Link>

                                <Link className={buttonVariants({
                                    variant: "outline"
                                })}
                                    href="/register-communities"
                                >
                                    <Plus className="mr-2" strokeWidth={1} /> New
                                </Link>
                            </div>
                        )
                    }
                </div> */}
            </div>

            <Card className="mt-5 w-full">
                <Table className="w-full">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableHeaderCell className="text-black">Name</TableHeaderCell>
                            <TableHeaderCell className="text-black">Address</TableHeaderCell>
                            <TableHeaderCell className="text-black">Date of Request</TableHeaderCell>
                            <TableHeaderCell className="text-black">Status</TableHeaderCell>
                            <TableHeaderCell className="text-black">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {request.filter((req) => isEmployeeSelected(req))
                            .map((community) => (
                                <TableRow key={community.id} className={`${community.status !== "Approve"?" text-red-600":"text-black"}`}>
                                    <TableCell>{community.urbanFarm.name}</TableCell>
                                    <TableCell>
                                        <Text>{community.urbanFarm.address}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatDate(community.createdAt)}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{community.status}</Text>
                                        
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    asChild
                                                >
                                                    <AlertDialog open={open} onOpenChange={setOpen}>
                                                        <AlertDialogTrigger
                                                            onClick={() => setOpen(true)}
                                                            className="text-sm p-3"
                                                        >
                                                           Review
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="m max-w-4xl">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Submitted Details</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                   <div>
                                                                        <h1>Fullname: {community.user.name + " " + community.user.lastName}</h1>                                                                     
                                                                        <h1>Email: {community.user.email}</h1>
                                                                        <h1>Blk / lot: {community.user.blk}</h1>
                                                                        <h1>Street: {community.user.street}</h1>
                                                                        
                                                                        <h1>Contact no: {community.user.phoneNumber}</h1>
                                                                        <h1>Can Provide: {community.products}</h1>
                                                                        <h1>Description: {community.description}</h1>
                                                                   </div>
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className={buttonVariants({
                                                                    variant: "destructive"
                                                                })}>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    className={buttonVariants({
                                                                        variant: "newGreen",
                                                                    })}
                                                                    disabled={isPending}
                                                                    onClick={() => {
                                                                        startTransition(() => {
                                                                            approvedConsignor(
                                                                                community.id
                                                                            ).then((callback) => {
                                                                                if (callback.error) {
                                                                                    toast({
                                                                                        description: callback.error,
                                                                                        variant: "destructive"
                                                                                    })
                                                                                }

                                                                                if (callback.success) {
                                                                                    toast({
                                                                                        description: callback.success,
                                                                                    })
                                                                                }
                                                                            })
                                                                        })
                                                                    }}
                                                                >Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>



            </Card>

        </>
    )
}

export default SearchRequest