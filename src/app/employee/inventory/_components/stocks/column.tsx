"use client"
import { ProductWithStocks, StocksWitProducts, employeeActivityHistoryWithTransaction } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DateTableColumnHeader"
import { formatDate } from "@/lib/utils"
import Image from "next/image"


export const columns: ColumnDef<StocksWitProducts>[] = [
    {
        accessorKey: "productImage",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product Image" />
            )
        },
        cell: ({ row }) => {
            const productImage = row.original.product?.productImage

            return (
                <div className="text-xs">
                    {productImage !== undefined && (
                        <Image
                         unoptimized
                         quality={100}
                         src={productImage}
                         alt="product image"
                         width={50}
                         height={50}
                     />
                    )}
                   
                </div>
            );
        },
    },
    {
        accessorKey: "productName",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Product Name" />
            );
        },
        cell: ({ row }) => {
            const productName = row.original.product?.name
            const currentDate = new Date()
            const isExpired = row.original.expiration <= currentDate
 
            return <div
                className={`text-xs ${isExpired && "text-red-600"}`}
            >
                {productName}
            </div>
        },
    },
    {
        accessorKey: "numberOfStocks",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Stocks" />
            );
        },
        cell: ({ row }) => {
            const numberOfStocks = row.original.numberOfStocks
            return <div
                className="text-xs"
            >
                {numberOfStocks}
            </div>
        },
    },
    {
        accessorKey: "unitOfMeasurement",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Unit" />
            );
        },
        cell: ({ row }) => {
            const unit = row.original.unitOfMeasurement
            return <div
                className="text-xs"
            >
                {unit}
            </div>
        },
    },
    {
        accessorKey: "harvestedFrom",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="From" />
            );
        },
        cell: ({ row }) => {
            const harvestedFrom = row.original.harvestedFrom
            return <div
             className="text-xs" 
            >
                {harvestedFrom}
            </div>
        },
    },
    {
        accessorKey: "expirtaion",
        header: ({ column }) => {
            
            return (
                <DataTableColumnHeader column={column} title="Expiration Date" />
            );
        },
        cell: ({ row }) => {
            const expiration = row.original.expiration;
            const currentDate = new Date()
            const isExpired = row.original.expiration <= currentDate
            return <div className={`text-xs ${isExpired && "text-red-600"}`}>{formatDate(expiration)}</div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Date Added" />
            );
        },
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return <div className="text-xs">{formatDate(createdAt)}</div>;
        },
    },
    
]