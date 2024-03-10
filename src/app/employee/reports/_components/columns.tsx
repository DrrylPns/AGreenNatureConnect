"use client"
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { Reports } from '../page'
import { DataTableColumnHeader } from '../../inventory/_components/DateTableColumnHeader'
import { MoreHorizontal, StickyNote } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu"
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
} from "@/app/components/Ui/alert-dialog"
import { Button } from '@/app/components/Ui/Button'
import { useForm } from 'react-hook-form'
import { handleReportSchema, handleReportType } from '@/lib/validations/employee/reports'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from '@/lib/hooks/use-toast'

export const columns: ColumnDef<Reports>[] = [
    {
        accessorKey: "reporter",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reporter" />
            )
        },
        cell: ({ row }) => {
            const reporterName = row.original.reporter.name
            const reporterLastName = row.original.reporter.lastName
            return <div
                className=""
            >
                {reporterName} {" "} {reporterLastName}
            </div>;
        },
    },
    {
        accessorKey: "reported",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reported User" />
            )
        },
        cell: ({ row }) => {
            const reportedName = row.original.reported.name
            const reportedLastName = row.original.reported.lastName
            return <div
                className=""
            >
                {reportedName} {" "} {reportedLastName}
            </div>;
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reason" />
            )
        },
        cell: ({ row }) => {
            const formatReportType = (reportType: string) => {
                return reportType.replace(/([a-z])([A-Z])/g, '$1 $2');
            };

            const reportType = row.original.type
            return <div
                className=""
            >
                {formatReportType(reportType)}
            </div>;
        },
    },
    {
        accessorKey: "post",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Post" />
            )
        },
        cell: ({ row }) => {
            const postId = row.original.post.id
            const topicName = row.original.post.topic.name
            return <div
                className=""
            >
                <a href={`/discussion/${topicName}/${postId}`} target='_blank'>
                    <StickyNote className='text-neutral-500' />
                </a>
            </div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reported At" />
            )
        },
        cell: ({ row }) => {
            const reportedAt = row.original.createdAt
            return <div
                className=""
            >
                {formatDate(reportedAt)}
            </div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [postId, setPostId] = useState<string>(row.original.post.id)
            const [reporterId, setReporterId] = useState<string>(row.original.reporter.id)
            const [reportedId, setReportedId] = useState<string>(row.original.reported.id)
            const [reportId, setIsReportId] = useState<string>(row.original.id)
            const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
            const [isRejectOpen, setIsRejectOpen] = useState<boolean>(false)

            const form = useForm<handleReportType>({
                resolver: zodResolver(handleReportSchema),
            })

            const { mutate: handleReport, isLoading } = useMutation({
                mutationFn: async ({ status, postId, reportedId, reporterId, reportId }: handleReportType) => {
                    const payload: handleReportType = {
                        status,
                        postId,
                        reportedId,
                        reporterId,
                        reportId,
                    }

                    const { data } = await axios.put("/api/employee/handleReport", payload)
                    return data
                },
                onError: (err) => {
                    return toast({
                        description: "Something went wrong!",
                        variant: "destructive",
                    })
                },
                onSuccess: () => {
                    toast({
                        title: "Success!",
                        description: "Report handled.",
                    })
                },
            })

            const onSubmit = (status: any) => {
                const payload: handleReportType = {
                    status: status,
                    postId: postId,
                    reportedId: reportedId,
                    reporterId: reporterId,
                    reportId: reportId,
                }

                handleReport(payload)
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => setIsConfirmOpen(true)}
                            >
                                Confirm Report
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => setIsRejectOpen(true)}
                            >
                                Decline Report
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                        {/* <AlertDialogTrigger>Confirm Report</AlertDialogTrigger> */}
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className='bg-[#099073] hover:bg-[#099073]/80'
                                    onClick={() => onSubmit("RESOLVED")}
                                >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                        {/* <AlertDialogTrigger>Reject Report</AlertDialogTrigger> */}
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className='bg-[#099073] hover:bg-[#099073]/80'
                                    onClick={() => onSubmit("REJECTED")}
                                >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )
        },
    }
]