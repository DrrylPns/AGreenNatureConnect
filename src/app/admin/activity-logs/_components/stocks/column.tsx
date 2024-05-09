"use client"
import { StocksWitProducts, employeeActivityHistoryWithTransaction } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DateTableColumnHeader"
import { cn, formatDate } from "@/lib/utils"
import { toast } from "@/lib/hooks/use-toast"
import Image from "next/image"
import { create } from "lodash"


export const columns: ColumnDef<StocksWitProducts>[] = [
    {
        accessorKey: "productImage",
        header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Product Image" />
          )
        },
        cell: ({ row }) => {
          const ProductImage = row.original.product?.productImage
          return <div
            className="cursor-pointer flex items-center justify-center"
          >
            {ProductImage !== undefined && (
                <Image
                  unoptimized
                  quality={100}
                  src={ProductImage}
                  alt="product image"
                  width={50}
                  height={50}
                />
 
            )}
          </div>;
        },
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
  
          return (
            <DataTableColumnHeader column={column} title="Name" />
          );
        },
        cell: ({ row }) => {
          const product = row.original.product?.name
          const outOfStock = row.original.product?.quantity === 0
          return <div
            onClick={() => {
              toast({
                title: "Success!",
                description: "Product name copied to clipboard.",
                variant: "default"
              })
              
              navigator.clipboard.writeText(product || "")
            }}
            className={cn("cursor-pointer font-bold",
              outOfStock ? "text-rose-500" : "text-emerald-600"
            )}
          >
            {product}
          </div>
        },
      },
      {
        accessorKey: "kilogram",
        header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Available stocks(kg)" />
          );
        },
        cell: ({ row }) => {
          const stockKilo = row.original.numberOfStocks;
          const outOfStock = row.original.numberOfStocks === 0;
          const numberOfStocks = row.original.numberOfStocks
          // const stocks = row.original.Stock;
          // const currentDate = new Date()
          // console.log(stocks)
          // const notExpiredStocks: Stocks[] | null = stocks.filter(stock => {
          //   const expirationDate = new Date(stock.expiration);
          //   // Return true if the expiration date is greater than or equal to the current date
          //   return expirationDate >= currentDate;
          // });
  
          // let totalNumberOfStocks = 0
          // const s = notExpiredStocks.map((stocks: Stocks)=>{
          //   totalNumberOfStocks += stocks.numberOfStocks
          // })
  
  
          return <div
            className={`${outOfStock && "text-rose-500"} text-center`}
          >{numberOfStocks}</div>;
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
  
          return (
            <DataTableColumnHeader column={column} title="Category" />
          );
        },
        cell: ({ row }) => {
          const category = row.original.product?.category;
          return <div className="text-center">{category}</div>;
        },
      },
      {
        accessorKey: "isFree",
        header: ({ column }) => {
  
          return (
            <DataTableColumnHeader column={column} title="Free" />
          );
        },
        cell: ({ row }) => {
          let status
          if (row.original.product?.isFree) {
            status = "Yes"
          } else {
            status = "No"
          }
          return <div>{status}</div>;
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
        accessorKey: "creatorId",
        header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title="Inserted by" />
          )
        },
        cell: ({ row }) => {
          const creator = row.original.userId
          const creatorName = row.original.user?.name;
          const creatorLastName = row.original.user?.lastName;
          return <div
            onClick={() => {
              toast({
                title: "Success!",
                description: "Farmer ID copied to clipboard.",
                variant: "default"
              })
              creator !== null && navigator.clipboard.writeText(creator)
            }}
            className="cursor-pointer"
          >
            {creatorName + " " + creatorLastName}
          </div>
        },
      },
]