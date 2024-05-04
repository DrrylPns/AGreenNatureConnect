"use client"
import { Button } from "@/app/components/Ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/Ui/Dropdown-Menu";
import { DataTableColumnHeader } from "@/app/employee/inventory/_components/DateTableColumnHeader";
import prisma from "@/lib/db/db";
import { toast } from "@/lib/hooks/use-toast";
import { cn, formatDate } from "@/lib/utils";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
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
} from "@/app/components/Ui/alert-dialog";
import { buttonVariants } from "@/app/components/Ui/Button";

export type Products = {
    id: string;
    productImage: string;
    name: string;
    // stockKilo: number;
    // stockPack: number;
    // category: string;
    // status: string;
    // createdAt: Date;
    // creatorId: string;
    // creator: User;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    category: string;
    status: string;
    createdAt: Date;
    creatorId: string;
    creator: User;
}

export const columns: ColumnDef<Products>[] =
    [{
        accessorKey: "productImage",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Product Image" />
            )
        },
        cell: ({ row }) => {
            // const productId = row.original.id
            const ProductImage = row.original.productImage
            return <div
                className="cursor-pointer flex items-center justify-center"
            // onClick={() => {
            //   toast({
            //     title: "Success!",
            //     description: "Employee ID copied to clipboard.",
            //     variant: "default"
            //   })
            //   navigator.clipboard.writeText(productId)
            // }}
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
    {
        accessorKey: "kilogram",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Stock kg" />
            );
        },
        cell: ({ row }) => {
            const stockKilo = row.original.kilograms;
            const outOfStock = row.original.kilograms === 0
            return <div
                className={`${outOfStock && "text-rose-500"}`}
            >{stockKilo}kg</div>;
        },
    },
    {
        accessorKey: "grams",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Stock grams" />
            );
        },
        cell: ({ row }) => {
            const stockKilo = row.original.grams;
            const outOfStock = row.original.grams === 0
            return <div
                className={`${outOfStock && "text-rose-500"}`}
            >{stockKilo}g</div>;
        },
    },
    {
        accessorKey: "pieces",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Stock pcs" />
            );
        },
        cell: ({ row }) => {
            const stockKilo = row.original.pieces;
            const outOfStock = row.original.pieces === 0;
            return <div
                className={`${outOfStock && "text-rose-500"}`}
            >{stockKilo}pcs</div>;
        },
    },
    {
        accessorKey: "pounds",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Stock lbs" />
            );
        },
        cell: ({ row }) => {
            const stockKilo = row.original.pounds;
            const outOfStock = row.original.pounds === 0
            return <div
                className={`${outOfStock && "text-rose-500"}`}
            >{stockKilo}lbs</div>;
        },
    },
    {
        accessorKey: "packs",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Stock pck" />
            );
        },
        cell: ({ row }) => {
            const stockKilo = row.original.packs;
            const outOfStock = row.original.packs === 0;
            return <div
                className={`${outOfStock && "text-rose-500"}`}
            >{stockKilo}pck</div>;
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
            const category = row.original.category;
            return <div>{category}</div>;
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
            const status = row.original.status;
            let statusColorClass = '';

            if (status === "DECLINED") {
                statusColorClass = 'text-rose-500';
            } else if (status === "APPROVED") {
                statusColorClass = 'text-emerald-600';
            }

            return <div className={`font-bold ${statusColorClass}`}>{status}</div>;
        },
    }
        ,
    // {
    //   accessorKey: "price",
    //   header: ({ column }) => {

    //     return (
    //       <DataTableColumnHeader column={column} title="Price" />
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const price = row.original.price;
    //     const formattedPrice = price.toLocaleString()

    //     return <div>{formattedPrice}{" "}PHP</div>;
    //   },
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
            const creator = row.original
            const creatorName = row.original.creator.name;
            return <div
                onClick={() => {
                    toast({
                        title: "Success!",
                        description: "Farmer ID copied to clipboard.",
                        variant: "default"
                    })
                    navigator.clipboard.writeText(creator.creatorId)
                }}
                className="cursor-pointer"
            >
                {creatorName}
            </div>
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const product = row.original
            const router = useRouter()
            const [status, setStatus] = useState('');
            const [productId, setProductId] = useState(row.original.id);
            const [accept, setAccept] = useState(false)
            const [decline, setDecline] = useState(false)
            const [isPending, startTransition] = useTransition()

            const updateProductStatus = async (newStatus: any) => {
                try {
                    const response = await fetch('/api/admin/inventory/updateApprove', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: productId,
                            status: newStatus,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    setStatus(newStatus);

                    toast({
                        description: `Successfully ${newStatus} the product`,
                        variant: "default"
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)

                } catch (error) {
                    console.error('Error:', error);
                    toast({
                        description: "Something went wrong",
                        variant: "destructive"
                    })
                }
            };

            const handleAccept = async () => {
                await updateProductStatus('APPROVED');
            };

            const handleDecline = async () => {
                await updateProductStatus('DECLINED');
            };

            const handleHide = async () => {
                await updateProductStatus('HIDDEN');
            };

            const handleFree = async () => {
                await updateProductStatus('FREE');
            };

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
                                className="text-green cursor-pointer"
                                // onClick={handleAccept}
                                onClick={() => {
                                    setAccept(true)
                                }}
                            >
                                Accept
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                // onClick={handleDelete}
                                // onClick={handleDecline}
                                onClick={() => {
                                    setDecline(true)
                                }}
                                className="text-rose-500 cursor-pointer"
                            >
                                Decline
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={accept} onOpenChange={setAccept}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will accept the selected product.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className={buttonVariants({
                                    variant: "destructive"
                                })}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className={buttonVariants({
                                        variant: "newGreen",
                                    })}
                                    disabled={isPending}
                                    onClick={() => {
                                        startTransition(() => {
                                            handleAccept()
                                        })
                                    }}
                                >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={decline} onOpenChange={setDecline}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will decline the selected product.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className={buttonVariants({
                                    variant: "destructive"
                                })}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className={buttonVariants({
                                        variant: "newGreen",
                                    })}
                                    disabled={isPending}
                                    onClick={() => {
                                        startTransition(() => {
                                            handleDecline()
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