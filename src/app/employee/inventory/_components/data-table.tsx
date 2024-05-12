"use client"

import {
  Settings2
} from "lucide-react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/Ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu"

import { Button, buttonVariants } from "@/app/components/Ui/Button"
import { Input } from "@/app/components/Ui/Input"
import { cn } from "@/lib/utils"
import { Legend } from "@tremor/react"
import Link from "next/link"
import React, { useState, useTransition } from "react"
import { DataTablePagination } from "./DataTablePagination"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/Ui/Dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/Ui/form"
import { Textarea } from "@/app/components/Ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateProductRequestSchema, CreateProductRequestType } from "@/lib/validations/employee/products"
import { createNotificationRequest } from "../../../../../actions/community"
import { toast } from "@/lib/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { numberOfProducts } from "../../../../../actions/products"
import { useQuery } from "@tanstack/react-query"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isFetching?: boolean
  isAdmin?: boolean
  isTransaction?: boolean;
  isReport?: boolean;
  isArchived?: boolean;
  isInventory?: boolean;
  isSalesReport?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching,
  isAdmin,
  isTransaction,
  isReport,
  isArchived,
  isInventory,
  isSalesReport
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})
  const [isPending, startTransition] = useTransition();

  const {
    data: productsCount,
  
  } = useQuery({
      queryKey: ["productsCount"],
      queryFn: async () => (await  numberOfProducts() as number),
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  const form = useForm<CreateProductRequestType>({
    resolver: zodResolver(CreateProductRequestSchema),
  });

  const onSubmit = (values: CreateProductRequestType) => {

    startTransition(() => {
      createNotificationRequest(values.request).then((callback) => {
        if (callback?.error) {
          toast({
            description: `${callback.error}`,
            variant: "destructive"
          })
        }

        if (callback?.success) {
          toast({
            description: `${callback.success}`
          })
        }

      })
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center py-4 justify-between">
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full">


          {/*  search functionality */}

          {isTransaction ? (
            <>
              <Input
                placeholder="Search"
                value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("status")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </>
          ) : isSalesReport ? (<></>) : (
            <>
              {isReport ? (
                <Input
                  placeholder="Search"
                  value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("type")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              ) : (
                <Input
                  placeholder="Search for products"
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              )}
            </>
          )}

          {/* Add Product */}
          {isAdmin || isTransaction || isReport || isArchived || isSalesReport ? null : (
            <>
              <Link
                href="/employee/create-products"
                className={cn(buttonVariants({
                  variant: "newGreen"
                }),
                  "ml-3 "
                )}
              >
                Add Item
              </Link>

              <Link
                href="/employee/archived-products"
                className={cn(buttonVariants({
                  variant: "outline"
                }))}
              >
                Archived Products
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'}>
                    Request Products
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className='flex flex-col items-start gap-1'>
                    <DialogTitle>Request a product</DialogTitle>
                    <DialogDescription className="w-full">

                    </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="w-2/3 space-y-6">

                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name="request"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Products you want to request</FormLabel>
                              <FormDescription>Note: this will send a request to your consignors</FormDescription>
                              <FormControl>
                                <Textarea
                                  placeholder="Include the quantity and products you want to request..."
                                  className="resize-none w-[270px] sm:w-[460px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className='bg-lime-600 hover:bg-lime-600/80' isLoading={isPending}>Submit</Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

            </>
          )}
          {isReport && (
            <Link
              href="/employee/report-history"
              className={cn(buttonVariants({
                variant: "newGreen"
              }), "ml-3")}
            >
              Report History
            </Link>
          )}
        </div>

        {isInventory && (
          <Legend
            className="mt-3 ml-5 w-full"
            categories={["In Stock", "Out of Stock", "Low Stock"]}
            colors={["emerald", "red", "yellow"]}
          />
        )}

        <div className="flex justify-center items-center gap-3 w-full">
          {!isTransaction || !isReport &&
            <div className="flex flex-row justify-end items-center w-[300px]">

              {/*<Legend
                className="mt-3"
                categories={["In", "Out of Stock", "Low Stock"]}
                colors={["emerald", "red", "yellow"]}
              />
          */}
            </div>
          }

          <div className="max-lg:flex max-lg:flex-col flex flex-row items-center gap-3">
            {/* <Legend
              className="mt-3"
              categories={["In Stock", "Out of Stock", "Low Stock"]}
              colors={["emerald", "red", "yellow"]}
            /> */}
            {/* VIEW FUNCTIONALITY */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {!isSalesReport && (
                  <Button variant="outline" className="lg:ml-auto">
                    <Settings2 className="mr-1 w-5 h-5" /> View
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu> */}
            <h1>Total number of products: {productsCount}</h1>
          </div>

      
        </div>
    
      </div>
      <div className="rounded-md border">
        <Table className="bg-white rounded-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isFetching ? (
                    <div className="text-muted-foreground">Fetching data...</div>
                  ) : (<div>No Results.</div>)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <br />
      <DataTablePagination table={table} />
    </div >
  )
}
