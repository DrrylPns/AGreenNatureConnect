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
import { cn, formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, User } from "@prisma/client";
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

export type Products = {
  id: string;
  productImage: string;
  name: string;
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
  isFree: boolean;
}

export const columns: ColumnDef<Products>[] =
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
      accessorKey: "isFree",
      header: ({ column }) => {

        return (
          <DataTableColumnHeader column={column} title="Free" />
        );
      },
      cell: ({ row }) => {
        let status
        if (row.original.isFree) {
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
        const creator = row.original
        const creatorName = row.original.creator.name;
        return <div
          onClick={() => {
            toast({
              title: "Success!",
              description: "Employee ID copied to clipboard.",
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
        const [productData, setProductData] = useState<Product | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [open, setIsOpen] = useState(false)
        const [isFreeUntil, setIsFreeUntil] = useState<Date>()
        const [isPending, startTransition] = useTransition()

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

        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
        })

        function onSubmit(values: z.infer<typeof formSchema>) {
          console.log("...")
        }

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
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  Copy Product ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                // onClick={() => router.push(`inventory/addstocks/${product.id}`)}
                >
                  <Link href={`inventory/addstocks/${product.id}`}>
                    Add Stocks
                  </Link>
                </DropdownMenuItem>
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
                  onClick={async () => {
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
                >
                  Archive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu >

            <Dialog open={open} onOpenChange={setIsOpen}>
              {/* <DialogTrigger>
                    {isFree ? 'Cancel Free Promo' : 'Free promo'}
                  </DialogTrigger> */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Please select a date</DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="freeUntil"
                          render={({ field }) => (
                            <FormItem className="flex flex-col mt-4">
                              <FormLabel>Specify the date until which the product remains available for free.</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value && isValid(new Date(field.value)) ? (
                                        format(new Date(field.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      {/* 
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )} */}

                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      // const isoDate = date?.toISOString();
                                      // field.onChange(isoDate);
                                      // setIsFreeUntil(isoDate as any);

                                      // const localDate = date?.toLocaleString();
                                      // field.onChange(localDate);
                                      // setIsFreeUntil(localDate as any);

                                      field.onChange(date);
                                      setIsFreeUntil(date);
                                    }}
                                    disabled={(date) => !isToday(date) && (isBefore(date, today) || isAfter(date, sevenDaysFromNow))}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          variant="newGreen"
                          onClick={() => (isFree ? "" : handleMakeFree(product.id, isFreeUntil as Date))}
                          disabled={!isFreeUntil}
                          isLoading={isLoading}
                        >
                          Submit
                        </Button>
                      </form>
                    </Form>
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
