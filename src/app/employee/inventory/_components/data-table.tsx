"use client"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeft,
    ChevronsRight,
    Settings2,
  } from "lucide-react"

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
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
import React, { useState } from "react"
import { DataTablePagination } from "./DataTablePagination"
import { Input } from "@/app/components/Ui/Input"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isFetching: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

    const [rowSelection, setRowSelection] = React.useState({})

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

  return (
    <div>
      <div className="flex items-center py-4">
        {/*  search functionality */}
        <Input
          placeholder="Search for products"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Visibility function */}
            <Link 
                href="/employee/create-products"
                className={cn(buttonVariants({
                  variant: "green"
                }),
                    "ml-3"
                    )}
            >
                Add Item
            </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 className="mr-1 w-5 h-5" /> View
            </Button>
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
        </DropdownMenu>

      </div>
        <div className="rounded-md border">
        <Table>
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
                    ): (<div>No Results.</div>)}
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        <br /> 
        <DataTablePagination table={table} />
    </div>
  )
}
