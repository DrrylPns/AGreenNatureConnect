"use client"
import { employeeActivityHistoryWithTransaction } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DateTableColumnHeader"
import { formatDate } from "@/lib/utils"


export const columns: ColumnDef<employeeActivityHistoryWithTransaction>[] = [
    {
        accessorKey: "productName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product Name" />
            )
        },
        cell: ({ row }) => {
            
            const product = row.original.product?.name
            return (
                <div className="text-xs">
                    {product}
                </div>
            );
        },
    },
    {
        accessorKey: "orderedVariant",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Action" />
            )
        },
        cell: ({ row }) => {
           const action = row.original.typeOfActivity
            
            return (
                <div className="text-xs">
                    {action}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Product Status" />
            );
        },
        cell: ({ row }) => {
            const status = row.original.product?.status
            return <div
             className="text-xs" 
            >
                {status}
            </div>
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
            const createdAt = row.original.createdAt;
            return <div className="text-xs">{formatDate(createdAt)}</div>;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Done by" />
            );
        },
        cell: ({ row }) => {
            const employeeFirstName = row.original.employee.name
            const employeeLastName = row.original.employee.lastName
            const farmerName = employeeFirstName + " " + employeeLastName
            return <div
                className="text-xs"
            >
                {farmerName}
            </div>
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Role" />
            );
        },
        cell: ({ row }) => {
          
            const role = row.original.employee.role
           
            return <div
                className="text-xs"
            >
                {role}
            </div>
        },
    },
]