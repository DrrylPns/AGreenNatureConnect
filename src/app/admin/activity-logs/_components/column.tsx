"use client"
import { employeeActivityHistoryWithTransaction } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DateTableColumnHeader"
import { formatDate } from "@/lib/utils"


export const columns: ColumnDef<employeeActivityHistoryWithTransaction>[] = [
    {
        accessorKey: "orderedVariant",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Ordered" />
            )
        },
        cell: ({ row }) => {
            const orderedVariants = row.original.transaction?.orderedVariant;
            
            const formattedProducts = orderedVariants?.map((variant) => {
                const productName = variant.product?.name || 'N/A';
                const quantity = variant.variant?.variant;
                const unitOfMeasurement = variant.variant?.unitOfMeasurement;

                let displayQuantity = '';
                switch (unitOfMeasurement) {
                    case 'kilograms':
                        displayQuantity = `${quantity} kg`;
                        break;
                    case 'grams':
                        displayQuantity = `${quantity} g`;
                        break;
                    case 'pounds':
                        displayQuantity = `${quantity} lbs`;
                        break;
                    case 'pieces':
                        displayQuantity = `${quantity} pcs`;
                        break;
                    case 'packs':
                        displayQuantity = `${quantity} pcks`;
                        break;
                    default:
                        displayQuantity = `${quantity} ${unitOfMeasurement}`;
                        break;
                }

                return `${productName} (${displayQuantity})`;
            });

            const formattedProductNames = formattedProducts?.join(', ') || 'N/A';
            
            return (
                <div className="text-xs">
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
                className="text-xs"
            >
                ₱ {amount}
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
        accessorKey: "buyerId",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Buyer" />
            );
        },
        cell: ({ row }) => {
            const buyerName = row.original.buyer
            return <div
             className="text-xs"
            >
                {buyerName}
            </div>
        },
    },
    {
        accessorKey: "buyerId",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Modified by" />
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
]