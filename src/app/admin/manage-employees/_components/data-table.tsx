"use client"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeft,
    ChevronsRight,
    Plus,
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
import { DataTablePagination } from "@/app/employee/inventory/_components/DataTablePagination"
import { Input } from "@/app/components/Ui/Input"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { MultiSelect, MultiSelectItem, Title } from "@tremor/react"
import { Community, User } from "@prisma/client"

interface DataTableProps<TData extends CommonEmployeeProperties, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isFetching?: boolean;
    employees: Array<User & { Community: Community | null }>;
    isEmployees?: boolean;
}

interface CommonEmployeeProperties {
    id: string;
    name: string | null;
    EmployeeId: string | null;
    lastName: string;
    phoneNumber: string;
    createdAt: Date;
    email: string;
}

export function DataTable<TData extends CommonEmployeeProperties, TValue extends CommonEmployeeProperties>({
    columns,
    data,
    isFetching,
    employees,
    isEmployees,
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

    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const isEmployeeSelected = (employee: User & { Community: Community | null }) =>
        selectedNames.length === 0 || selectedNames.includes(employee.name || "");

    const handleValueChange = (value: string | string[]) => {
        const names = Array.isArray(value) ? value : [value];
        setSelectedNames(names);
    };

    return (
        <div>
            <div className='flex flex-row justify-between'>
                <div>
                    <Title className='text-[50px] mb-7 mt-3'>Employees</Title>
                </div>

                <div className='flex flex-row justify-center items-center'>

                    <MultiSelect
                        className="max-w-full sm:max-w-xs mr-4"
                        onValueChange={handleValueChange}
                        placeholder="Search Employees..."
                    >
                        {employees.map((employee) => (
                            <MultiSelectItem key={employee.name} value={employee.name || ""}>
                                {employee.name}
                            </MultiSelectItem>
                        ))}
                    </MultiSelect>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                <Settings2 className="mr-1 w-5 h-5" />
                                View
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


                    <Link className={cn(buttonVariants({
                        variant: "newGreen"
                    }),
                        "bg-[#15A2D4] ml-4 px-7"
                    )}
                        href={"/admin/add-employee"}
                    >
                        <Plus strokeWidth={"1.5"} className='mr-1' width={16} height={16} />
                        Employee
                    </Link>
                </div>
            </div>
            <div className="rounded-lg">
                <Table className="bg-white rounded-lg ">
                    <TableHeader className={`rounded-lg ${isEmployees && "bg-[#b5b5b5] "}`}>
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
                            table.getRowModel().rows
                                //@ts-ignore
                                .filter((row) => isEmployeeSelected(row.original as TData))
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
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
        </div>
    )
}
