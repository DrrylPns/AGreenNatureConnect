import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { Reports } from '../page'
import { DataTableColumnHeader } from '../../inventory/_components/DateTableColumnHeader'

export const columns: ColumnDef<Reports>[] = [
    {
        accessorKey: "reporter",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reporter" />
            )
        },
        cell: ({ row }) => {
            const reporterName = row.original.reporter.name
            return <div
                className="cursor-pointer flex items-center justify-center"
            >
                {reporterName}
            </div>;
        },
    },
]