"use client"
import { DeactivatedEmployees } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/app/employee/inventory/_components/DateTableColumnHeader";
import { toast } from "@/lib/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import {
    MoreHorizontal,
} from "lucide-react"
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
import { useState, useTransition } from "react";
import { buttonVariants } from "@/app/components/Ui/Button";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleFarmerStaff } from "../../../../../actions/community";


export const DeactivateColumn: ColumnDef<DeactivatedEmployees>[] = [
    {
        accessorKey: "EmployeeId",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Farmer ID" />
        },
        cell: ({ row }) => {
            const idEmp = row.original.EmployeeId

            return (
                <div>
                    {idEmp}
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="First Name" />
            );
        },
        cell: ({ row }) => {
            const empName = row.original.name
            return <div>
                {empName}
            </div>
        },
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Last Name" />
            );
        },
        cell: ({ row }) => {
            const empLastName = row.original.lastName
            return <div>
                {empLastName}
            </div>
        },
    },
    {
        accessorKey: "phoneNumber",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Contact No." />
            );
        },
        cell: ({ row }) => {
            const contact = row.original.phoneNumber
            return <div>
                {contact}
            </div>
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />
            );
        },
        cell: ({ row }) => {
            const email = row.original.email
            return <div>
                {email}
            </div>
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Date Joined" />
            );
        },
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return <div>{formatDate(createdAt)}</div>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const employee = row.original
            const farmerId = row.original.id
            const router = useRouter()
            const [open, setOpen] = useState(false)
            const [isPending, startTransition] = useTransition()

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open </span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push(`manage-employees/${employee.id}`)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setOpen(true)}
                                className="text-lime-500 hover:text-lime-500/70 cursor-pointer"
                            >
                                Activate
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem
                            onClick={handleArchive}
                        >Archive</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Note: By activating this user, you are accepting that they can use their accounts again to manage the dashboard!
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className={buttonVariants({
                                    variant: "destructive"
                                })}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className={buttonVariants({
                                        variant: "newGreen"
                                    })}
                                    onClick={() => {
                                        startTransition(() => {
                                            handleFarmerStaff(farmerId, false).then((callback) => {
                                                if (callback.error) {
                                                    toast({
                                                        description: callback.error,
                                                        variant: "destructive",
                                                    })
                                                }

                                                if (callback.success) {
                                                    toast({
                                                        description: callback.success
                                                    })
                                                }

                                            })
                                        })
                                    }}
                                >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </>

            )
        },
    },
]