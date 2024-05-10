import { CompletedTransaction } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../inventory/_components/DateTableColumnHeader";

export const ColumnSalesReport: ColumnDef<CompletedTransaction>[] = [
    {
        accessorKey: "referenceId",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reference ID" />
            );
        },
        cell: ({ row }) => {
            const id = row.original.referenceId

            return (
                <>
                    {id}
                </>
            )
        },
    },
    // {
    //     accessorKey: "products",
    //     header: ({ column }) => {
    //         return (
    //             <DataTableColumnHeader column={column} title="Ordered Products" />
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const id = row.original.orderedProducts.

    //         return (
    //             <>
    //                 {id}
    //             </>
    //         )
    //     },
    // }
]