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
import React, { useState } from "react"
import { DataTablePagination } from "./DataTablePagination"

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

          ) : (
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
          {isAdmin || isTransaction || isReport || isArchived ? null : (
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="lg:ml-auto">
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
