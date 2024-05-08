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
import { Community } from "@prisma/client";
import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from '@tremor/react';
import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { handleCommunity } from "../../../../actions/community";
import useSpeechRecognition from "@/lib/hooks/useSpeechRecognition";

interface SearchEmployeesProps {
    // employees: Array<User & { Community: Community | null }>;
    communities: Array<Community>
    isArchivePanel?: boolean
}

const SearchCommunities: React.FC<SearchEmployeesProps> = ({
    communities,
    isArchivePanel,
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

    const isEmployeeSelected = (community: Community) =>
        selectedNames.length === 0 || selectedNames.includes(community.name || "");

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
                    {communities.map((community) => (
                        <MultiSelectItem key={community.id} value={community.name || ""}>
                            {community.name}
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



                <div className="flex gap-3 w-full justify-end">
                    {isArchivePanel ? (
                        <>
                            <Link className={cn(buttonVariants({
                                variant: "outline"
                            }),
                                "w-full"
                            )}
                                href="/communities"
                            >
                                Active Communities
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
                </div>
            </div>

            <Card className="mt-5 w-full">
                <Table className="w-full">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableHeaderCell className="text-black">Name</TableHeaderCell>
                            <TableHeaderCell className="text-black">Address</TableHeaderCell>
                            <TableHeaderCell className="text-black">Date Joined</TableHeaderCell>
                            <TableHeaderCell className="text-black">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {communities.filter((community) => isEmployeeSelected(community))
                            .map((community) => (
                                <TableRow key={community.id}>
                                    <TableCell>{community.name}</TableCell>
                                    <TableCell>
                                        <Text>{community.address}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{formatDate(community.createdAt)}</Text>
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
                                                            {
                                                                isArchivePanel ? (<>Restore</>) : (<>Archive</>)
                                                            }
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    {
                                                                        isArchivePanel ? (<>This will restore the selected community.</>) : (
                                                                            <>This will archive the selected community.</>
                                                                        )
                                                                    }
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
                                                                            handleCommunity(community.id, isArchivePanel).then((callback) => {
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

export default SearchCommunities