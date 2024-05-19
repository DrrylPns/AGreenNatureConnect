"use client"
import { Button } from "@/app/components/Ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/Ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/Ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/lib/hooks/use-toast";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, Stocks, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { addDays, format, isAfter, isBefore, isToday, isValid } from "date-fns";
import {
  CalendarIcon,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { archiveProduct } from "../../../../../actions/products";
import { DataTableColumnHeader } from "./DateTableColumnHeader";
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
import { LatestProduct, ProductWithStocks } from "@/lib/types";

export type Products = {
  id: string;
  productImage: string;
  name: string;
  quantity: number;
  priceInKg: number;
  harvestedFrom: string;
  category: string;
  status: string;
  createdAt: Date;
  creatorId: string;
  creator: User;
  isFree: boolean;
}

export const columns: ColumnDef<LatestProduct>[] =
  [
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
          className="cursor-pointer w-10 h-10 flex items-center justify-center"
        >
          <Image
            unoptimized
            quality={100}
            src={ProductImage}
            alt="product image"
            className="object-cover w-full h-full"
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
        const outOfStock = row.original.quantity === 0
        return <div
          // onClick={() => {
          //   toast({
          //     title: "Success!",
          //     description: "Product name copied to clipboard.",
          //     variant: "default"
          //   })
          //   navigator.clipboard.writeText(product)
          // }}
          // className={cn("cursor-pointer font-bold text-sm",
          //   outOfStock ? "text-rose-500" : "text-emerald-600"
          // )} 
          className="font-bold text-sm"
        >
          {product}
        </div>
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Stocks(kg)" />
        );
      },
      cell: ({ row }) => {
        const stockKilo = row.original.quantity;
        const outOfStock = row.original.quantity === 0;
        const numberOfStocks = row.original.quantity
      
        return <div
          className={`${outOfStock ? "text-rose-500" : "text-emerald-600"}text-sm text-center`}
        >{numberOfStocks}</div>;
      },
    },
    {
      accessorKey: "quantityInPieces",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Stocks(pcs)" />
        );
      },
      cell: ({ row }) => {
       
        const outOfStock = row.original.quantityInPieces === 0;
        const numberOfStocks = row.original.quantityInPieces
      
        return <div
          className={`${outOfStock ? "text-rose-500" : "text-emerald-600"}text-sm text-center`}
        >{numberOfStocks}</div>;
      },
    },
    {
      accessorKey: "quantityInPacks",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader column={column} title="Stocks(pcks)" />
        );
      },
      cell: ({ row }) => {
        const stockPacks = row.original.quantityIPacks;
        const outOfStock = row.original.quantityIPacks === 0;
        const numberOfStocks = row.original.quantityIPacks
      
        return <div
          className={`${outOfStock ? "text-rose-500" : "text-emerald-600"}text-sm text-center`}
        >{numberOfStocks}</div>;
      },
    },
    {
      accessorKey: "priceInKg",
      header: ({ column }) => {

        return (
          <DataTableColumnHeader column={column} title="Price in Kg" />
        );
      },
      cell: ({ row }) => {
        const price = row.original.priceInKg;
        return <div className="text-center text-sm">{formatPrice(price)}</div>;
      },
    },
    {
      accessorKey: "priceInPieces",
      header: ({ column }) => {

        return (
          <DataTableColumnHeader column={column} title="Price in Pieces" />
        );
      },
      cell: ({ row }) => {
        const price = row.original.priceInPieces;
        return <div className="text-center text-sm">{formatPrice(price)}</div>;
      },
    },
    {
      accessorKey: "priceInPacks",
      header: ({ column }) => {

        return (
          <DataTableColumnHeader column={column} title="Price in Packs" />
        );
      },
      cell: ({ row }) => {
        const price = row.original.priceInPacks;
        return <div className="text-center text-sm">{formatPrice(price)}</div>;
      },
    },
    // {
    //   accessorKey: "category",
    //   header: ({ column }) => {

    //     return (
    //       <DataTableColumnHeader column={column} title="Category" />
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const category = row.original.category;
    //     return <div className="text-center text-sm">{category}</div>;
    //   },
    // },
    // {
    //   accessorKey: "isFree",
    //   header: ({ column }) => {

    //     return (
    //       <DataTableColumnHeader column={column} title="Free" />
    //     );
    //   },
    //   cell: ({ row }) => {
    //     let status
    //     if (row.original.isFree) {
    //       status = "Yes"
    //     } else {
    //       status = "No"
    //     }
    //     return <div className="text-sm">{status}</div>;
    //   },
    // },
    // {
    //   accessorKey: "revenue",
    //   header: ({ column }) => {

    //     return (
    //       <DataTableColumnHeader column={column} title="Revenue" />
    //     );
    //   },
    //   cell: ({ row }) => {
    //     const orderedProducts = row.original.orderedProducts;
    //     let revenue = 0
    //     orderedProducts.map((product) => {
    //       revenue += product.totalPrice
    //     })
    //     return <div className="text-sm">{formatPrice(revenue)}</div>;
    //   },
    // },
    // {
    //   accessorKey: "creatorId",
    //   header: ({ column }) => {
    //     return (
    //       <DataTableColumnHeader column={column} title="Inserted by" />
    //     )
    //   },
    //   cell: ({ row }) => {
    //     const creator = row.original
    //     const creatorName = row.original.creator.name;
    //     const creatorLastName = row.original.creator.lastName;
    //     return <div
    //       onClick={() => {
    //         toast({
    //           title: "Success!",
    //           description: "Farmer ID copied to clipboard.",
    //           variant: "default"
    //         })
    //         navigator.clipboard.writeText(creator.creatorId)
    //       }}
    //       className="cursor-pointer"
    //     >
    //       {creatorName + " " + creatorLastName}
    //     </div>
    //   },
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const [productData, setProductData] = useState<Product | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [open, setIsOpen] = useState(false)
        const [isFreeUntil, setIsFreeUntil] = useState<Date>()
        const [isPending, startTransition] = useTransition()
        const [openArchive, setOpenArchive] = useState(false)

        const product = row.original
        const today = new Date();
        const sevenDaysFromNow = addDays(today, 7);

        useEffect(() => {
          const fetchProductData = async () => {
            try {
              const { data } = await axios.get(`/api/employee/products/${product.id}`);
              setProductData(data as Product);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching product data:', error);
              setIsLoading(false);
            }
          };

          fetchProductData();
        }, [product.id, product]);

        const isFree = productData?.isFree

        const updateProductMutation = async ({ productId, isFree, isFreeUntil }: { productId: string, isFree: boolean, isFreeUntil: Date }) => {
          try {
            const response = await fetch(`/api/employee/products/${productId}/updateFree`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ productId, isFree, isFreeUntil }),
            });

            if (!response.ok) {
              throw new Error(`Failed to update product. Status: ${response.status}`);
            }

            toast({
              title: "Updated",
              description: "Successfully updated the product.",
              variant: "default",
            })

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error) {
            toast({
              title: "Error",
              description: "Something went wrong.",
              variant: "destructive",
            })
          }
        }

        const { mutate: updateProduct } = useMutation(updateProductMutation);

        const handleMakeFree = (productId: string, isFreeUntil: Date) => {
          updateProduct({ productId, isFree: true, isFreeUntil });
        }

        const handleMakeNotFree = (productId: string, isFreeUntil: Date) => {
          updateProduct({ productId, isFree: false, isFreeUntil });
        }

        const formSchema = z.object({
          freeUntil: z.coerce.date(),
        })

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
                {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  Copy Product ID
                </DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                // onClick={() => router.push(`inventory/addstocks/${product.id}`)}
                >
                  <Link href={`inventory/addstocks/${product.id}`}>
                    Add new stocks
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                // onClick={() => router.push(`inventory/addstocks/${product.id}`)}
                >
                  <Link href={`inventory/stocks/${product.id}`}>
                    View stocks
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                // onClick={() => router.push(`inventory/addstocks/${product.id}`)}
                >
                  <Link href={`inventory/updatestocks/${product.id}`}>
                    Update stocks
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                // onClick={() => router.push(`inventory/${product.id}`)}
                >
                  <Link href={`inventory/${product.id}`}>
                    Edit Product
                  </Link>
                </DropdownMenuItem>

                {/* if it is free,  cancel it */}
                <DropdownMenuItem className="cursor-pointer" onSelect={() => (isFree ? handleMakeNotFree(product.id, isFreeUntil as Date) : setIsOpen(true))}>
                  {isFree ? 'Cancel Free Promo' : 'Free promo'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    //   startTransition(() => {
                    //     archiveProduct(product.id).then((callback) => {
                    //       if (callback.error) {
                    //         toast({
                    //           description: callback.error,
                    //           variant: "destructive"
                    //         })
                    //       }

                    //       if (callback.success) {
                    //         toast({
                    //           description: callback.success
                    //         })
                    //       }
                    //     })
                    //   })
                    // }
                    setOpenArchive(true)
                  }}
                >
                  Archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu >

            <AlertDialog open={openArchive} onOpenChange={setOpenArchive}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will archive the selected product.
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
                        archiveProduct(product.id).then((callback) => {
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
                  >Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Dialog open={open} onOpenChange={setIsOpen}>
              {/* <DialogTrigger>
                    {isFree ? 'Cancel Free Promo' : 'Free promo'}
                  </DialogTrigger> */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure that you want to make this product free?</DialogTitle>
                  <DialogDescription className="flex flex-col gap-3">
                    <div>
                      By confirming you agree to make this specific product free.
                    </div>

                    <Button
                      type="submit"
                      variant="newGreen"
                      onClick={() => (isFree ? "" : handleMakeFree(product.id, isFreeUntil as Date))}
                    >
                      Submit
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )
      },
    },
  ]

//   export const columns: ColumnDef<Products>[] = (products?.length ? Object.keys(products[0]) : []).map((key) => ({
//     accessorKey: key as keyof Products,
//     header: key.charAt(0).toUpperCase() + key.slice(1),
//   }));
