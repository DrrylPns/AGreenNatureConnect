import { CompletedTransaction, ProductRequestWithConsignee } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate, formatDateWithTime } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu"
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { productRequestReceived } from "../../../../../actions/community";
import { toast } from "@/lib/hooks/use-toast";
import { DataTableColumnHeader } from "../../inventory/_components/DateTableColumnHeader";

export const ColumnRequest: ColumnDef<ProductRequestWithConsignee>[] = [
    // {
    //     accessorKey: "id",
    //     header: ({ column }) => {
    //         return (
    //             <DataTableColumnHeader column={column} title="ID" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const id = row.original.id

    //         return (
    //             <>
    //                 {id}
    //             </>
    //         )
    //     },
    // },
    {
        accessorKey: "request",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Request" />
            );
        },
        cell: ({ row }) => {
            const req = row.original.request

            return (
                <>
                    {req}
                </>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Status" />
            );
        },
        cell: ({ row }) => {
            const status = row.original.status

            return (
                <>
                    {status}
                </>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Date" />
            );
        },
        cell: ({ row }) => {
            const date = row.original.createdAt;

            return (
                <>
                    {formatDateWithTime(date)}
                </>
            );
        },
    },
    {
        accessorKey: "consignee",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Consignor" />
            );
        },
        cell: ({ row }) => {
            const name = row.original.consignee?.name;
            const lastName = row.original.consignee?.lastName;

            return (
                <>
                    {name} {" "} {lastName}
                </>
            );
        },
    },
    {
        accessorKey: "answer",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Intent" />
            );
        },
        cell: ({ row }) => {
            const answer = row.original.answer;

            return (
                <>
                    {answer}
                </>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const id = row.original.id
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
                                className="cursor-pointer"
                                onClick={() => {
                                    startTransition(() => {
                                        productRequestReceived(id).then((callback) => {
                                            if (callback.error) {
                                                toast({
                                                    description: callback.error,
                                                    variant: "destructive"
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
                            >
                                Received
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem
                            onClick={handleArchive}
                        >Archive</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]