"use client"
import { employeeActivityHistoryWithTransaction } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DateTableColumnHeader"
import { formatDate } from "@/lib/utils"


export const columns: ColumnDef<employeeActivityHistoryWithTransaction>[] = [
    {
        accessorKey: "orderedVariant",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Title" />
            )
        },
        cell: ({ row }) => {
            const blogId = row.original.blog?.id
            const materialsId = row.original.blog?.id
            const videoId = row.original.blog?.id

            if(blogId !== null) {
                const title = row.original.blog?.title
                return (
                    <div className="text-xs">
                        {title}
                    </div>
                );
            } else if(materialsId !== null) {
                const title = row.original.learningMaterial?.title
                return (
                    <div className="text-xs">
                        {title}
                    </div>
                );
            } else if(videoId !== null){
                const title = row.original.video?.title
                return (
                    <div className="text-xs">
                        {title}
                    </div>
                );
            } else {
                return (
                    <div className="text-xs">
                        N/A
                    </div>
                );
            }
            
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Date" />
            );
        },
        cell: ({ row }) => {
          const date = row.original.createdAt
          return <div
          className="text-xs" 
         >
             {formatDate(date)}
         </div>
        },
    },
    {
        accessorKey: "Type",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Action" />
            );
        },
        cell: ({ row }) => {
            const activity = row.original.typeOfActivity
            return <div
             className="text-xs" 
            >
                {activity}
            </div>
        },
    },
    {
        accessorKey: "Name",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Done by" />
            );
        },
        cell: ({ row }) => {
            const name = row.original.employee.name;
            const lastName = row.original.employee.lastName;
            return <div className="text-xs">{name + " " + lastName}</div>;
        },
    },
    {
        accessorKey: "Role",
        header: ({ column }) => {

            return (
                <DataTableColumnHeader column={column} title="Role" />
            );
        },
        cell: ({ row }) => {
            const role = row.original.employee.role;
            return <div className="text-xs">{role}</div>;
        },
    }
]