"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../inventory/_components/DateTableColumnHeader";
import { formatDate } from "@/lib/utils";

import { employeeActivityHistoryWithTransaction } from "@/lib/types";


export const columns: ColumnDef<employeeActivityHistoryWithTransaction>[] =
    [
        // {
        //     accessorKey: "referenceId",
        //     header: ({ column }) => {
        //         return (
        //             <DataTableColumnHeader column={column} title="Ref.ID" />
        //         )
        //     },
        //     cell: ({ row }) => {
        //         const referenceId = row.original.referenceId
        //         return <div
        //             className="cursor-pointer flex items-center justify-center"
        //         >
        //             {referenceId}
        //         </div>;
        //     },
        // },
        {
            accessorKey: "orderedVariant",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Ordered" />
                )
            },
            cell: ({ row }) => {
                const orderedProducts = row.original.transaction?.orderedProducts;
            
                
                const formattedProducts = orderedProducts?.map((product) => {
                    const productName = product.product?.name || 'N/A';
                  
                    return `${productName} (${product.quantity}Kg)`;
                });

                const formattedProductNames = formattedProducts?.join(', ') || 'N/A';
                
                return (
                    <div className="">
                        {formattedProductNames}
                    </div>
                );
            },
        },
        {
            accessorKey: "amount",
            header: ({ column }) => {

                return (
                    <DataTableColumnHeader column={column} title="Amount" />
                );
            },
            cell: ({ row }) => {
                const amount = row.original.amount
                return <div
                    className=""
                >
                    {amount}
                </div>
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
                return <div
                    className=""
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
                return <div>{formatDate(createdAt)}</div>;
            },
        },
        {
            accessorKey: "buyerId",
            header: ({ column }) => {

                return (
                    <DataTableColumnHeader column={column} title="Buyer" />
                );
            },
            cell: ({ row }) => {
                const buyerName = row.original.buyer
                return <div
                    className=""
                >
                    {buyerName}
                </div>
            },
        },
        {
            accessorKey: "buyerId",
            header: ({ column }) => {

                return (
                    <DataTableColumnHeader column={column} title="Status Modified by" />
                );
            },
            cell: ({ row }) => {
                const employeeFirstName = row.original.employee.name
                const employeeLastName = row.original.employee.lastName
                const farmerName = employeeFirstName + " " + employeeLastName
                return <div
                    className=""
                >
                    {farmerName}
                </div>
            },
        },
    ]