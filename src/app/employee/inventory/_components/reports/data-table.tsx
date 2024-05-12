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

import { toast } from "@/lib/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/Ui/popover"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { useQuery } from "@tanstack/react-query"
import { createNotificationRequest } from "../../../../../../actions/community"
import { numberOfProducts } from "../../../../../../actions/products"


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
  isCatA?: boolean;
  isCatB?: boolean;
  isCatC?: boolean;
  totalSalesValue?: number;
  totalSalectedCatA?:number,
  totalSalectedCatB?:number,
  totalSalectedCatC?:number,
  salesRevPercentageCatA?: number,
  salesRevPercentageCatB?: number,
  salesRevPercentageCatC?: number,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching,
  isAdmin,
  totalSalesValue,
  isCatA,
  isCatB,
  isCatC,
  totalSalectedCatA,
  totalSalectedCatB,
  totalSalectedCatC,
  salesRevPercentageCatA,
  salesRevPercentageCatB,
  salesRevPercentageCatC,
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
      <div className="flex justify-end gap-x-24 my-2 text-xl font-medium pr-10">
        <h1>Total:</h1>
        <h1>₱{isCatA ?totalSalectedCatA : isCatB ? totalSalectedCatB : isCatC ? totalSalectedCatC : null}</h1>
        <h1>{isCatA ?salesRevPercentageCatA?.toFixed(2) : isCatB ? salesRevPercentageCatB?.toFixed(2) : isCatC ? salesRevPercentageCatC?.toFixed(2) : null}%</h1>
      </div>
     
      <br />
      <DataTablePagination table={table} />
    </div >
  )
}
