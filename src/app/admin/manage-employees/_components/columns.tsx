"use client"
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
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
import { Button } from "@/app/components/Ui/Button"
import { Checkbox } from "@/app/components/Ui/checkbox"
import { useRouter } from "next/navigation";
import { toast } from "@/lib/hooks/use-toast";
import { DataTableColumnHeader } from "@/app/employee/inventory/_components/DateTableColumnHeader";

export type Employees = {
    id: string;
    EmployeeId: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    createdAt: Date;
    email: string;
    isAdminPage?: boolean
}

export const columns: ColumnDef<Employees>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    // },
    {
        accessorKey: "EmployeeId",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Farmer ID" />
            )
        },
        cell: ({ row }) => {
            const idEmp = row.original.EmployeeId
            return <div
                className="cursor-pointer"
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Farmer ID copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(idEmp)
                }}
            >
                {idEmp}
            </div>
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
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Farmer copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(empName)
                }}
                className="cursor-pointer"
            >
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
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Lastname copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(empLastName)
                }}
                className="cursor-pointer"
            >
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
            const empContact = row.original.phoneNumber
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Contact Number copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(empContact)
                }}
                className="cursor-pointer"
            >
                {empContact}
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
            const empEmail = row.original.email
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Email copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(empEmail)
                }}
                className="cursor-pointer"
            >
                {empEmail}
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
            const router = useRouter()

            // const handleArchive = () => {
            //     console.log(`Hiding product with ID: ${employee.id}`);
            // };

            return (
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
                        >Edit</DropdownMenuItem>
                        {/* <DropdownMenuItem
                            onClick={handleArchive}
                        >Archive</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]