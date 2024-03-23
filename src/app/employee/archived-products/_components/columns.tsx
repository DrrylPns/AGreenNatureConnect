"use client"
import { ApprovalStatus, User, Variant, } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../inventory/_components/DateTableColumnHeader";
import Image from "next/image";
import { toast } from "@/lib/hooks/use-toast";
import { cn, formatDate } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/Ui/Button";
import { useTransition } from "react";
import { unarchiveProduct } from "../../../../../actions/products";

type Product = {
    id: string;
    itemNumber: number | null;
    productImage: string;
    name: string;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    category: string;
    status: ApprovalStatus;
    isFree: boolean;
    isFreeUntil: Date | null;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
    communityId: string;
    creator: User;
    variant: Variant;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "productImage",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product Image" />
            )
        },
        cell: ({ row }) => {
            const ProductImage = row.original.productImage
            return <div
                className="cursor-pointer flex items-center justify-center"
            >
                <Image
                    unoptimized
                    quality={100}
                    src={ProductImage}
                    alt="product image"
                    width={50}
                    height={50}
                />
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
            const product = row.original.name
            const outOfStock = row.original.kilograms === 0 && row.original.packs === 0 && row.original.pieces === 0 && row.original.pounds === 0 && row.original.grams === 0
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Product name copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(product)
                }}
                className={cn("cursor-pointer font-bold",
                    outOfStock ? "text-rose-500" : "text-emerald-600"
                )}
            >
                {product}
            </div>
        },
    },
    // {
    //     accessorKey: "kilogram",
    //     header: ({ column }) => {
    //         return (
    //             <DataTableColumnHeader column={column} title="Stock kg" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const stockKilo = row.original.kilograms;
    //         const outOfStock = row.original.kilograms === 0
    //         return <div
    //             className={`${outOfStock && "text-rose-500"}`}
    //         >{stockKilo}kg</div>;
    //     },
    // },
    // {
    //     accessorKey: "grams",
    //     header: ({ column }) => {

    //         return (
    //             <DataTableColumnHeader column={column} title="Stock grams" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const stockKilo = row.original.grams;
    //         const outOfStock = row.original.grams === 0
    //         return <div
    //             className={`${outOfStock && "text-rose-500"}`}
    //         >{stockKilo}g</div>;
    //     },
    // },
    // {
    //     accessorKey: "pieces",
    //     header: ({ column }) => {

    //         return (
    //             <DataTableColumnHeader column={column} title="Stock pcs" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const stockKilo = row.original.pieces;
    //         const outOfStock = row.original.pieces === 0;
    //         return <div
    //             className={`${outOfStock && "text-rose-500"}`}
    //         >{stockKilo}pcs</div>;
    //     },
    // },
    // {
    //     accessorKey: "pounds",
    //     header: ({ column }) => {

    //         return (
    //             <DataTableColumnHeader column={column} title="Stock lbs" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const stockKilo = row.original.pounds;
    //         const outOfStock = row.original.pounds === 0
    //         return <div
    //             className={`${outOfStock && "text-rose-500"}`}
    //         >{stockKilo}lbs</div>;
    //     },
    // },
    // {
    //     accessorKey: "packs",
    //     header: ({ column }) => {

    //         return (
    //             <DataTableColumnHeader column={column} title="Stock pck" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const stockKilo = row.original.packs;
    //         const outOfStock = row.original.packs === 0;
    //         return <div
    //             className={`${outOfStock && "text-rose-500"}`}
    //         >{stockKilo}pck</div>;
    //     },
    // },
    {
        accessorKey: "category",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Category" />
            );
        },
        cell: ({ row }) => {
            const category = row.original.category;
            return <div>{category}</div>;
        },
    },
    // {
    //     accessorKey: "isFree",
    //     header: ({ column }) => {

    //         return (
    //             <DataTableColumnHeader column={column} title="Free" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         let status
    //         if (row.original.isFree) {
    //             status = "Yes"
    //         } else {
    //             status = "No"
    //         }
    //         return <div>{status}</div>;
    //     },
    // },
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
            const product = row.original
            const creator = row.original.creator
            const creatorName = creator.name
            const creatorLastName = creator.lastName
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Employee ID copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(product.creatorId)
                }}
                className="cursor-pointer"
            >
                {creatorName} {" "} {creatorLastName}
            </div>
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const [isPending, startTransition] = useTransition()
            const product = row.original

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
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={async () => {
                                    startTransition(() => {
                                        unarchiveProduct(product.id).then((callback) => {
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
                                Archive
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu >
                </>
            )
        },
    },
]