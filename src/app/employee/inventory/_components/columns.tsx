"use client"
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/Ui/Dropdown-Menu"
import { Button } from "@/app/components/Ui/Button"
import { DataTableColumnHeader } from "./DateTableColumnHeader";
import { Checkbox } from "@/app/components/Ui/checkbox"
import { useRouter } from "next/navigation";

export type Products = {
    id: string;
    itemNumber: number;
    name: string;
    kilo: number;
    price: number;
    createdAt: Date;
    creatorId: string;
  }

  export const columns: ColumnDef<Products>[] = 
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
        accessorKey: "itemNumber",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Item No." />
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
        
            return (
              <DataTableColumnHeader column={column} title="Product" />
            );
          },
        },
    {
        accessorKey: "kilo",
        header: ({ column }) => {
        
            return (
              <DataTableColumnHeader column={column} title="Kilo" />
            );
          },
          cell: ({ row }) => {
            const kilo = row.original.kilo;
            return <div>{kilo}kg</div>;
          },
        },
        {
          accessorKey: "price",
          header: ({ column }) => {
        
            return (
              <DataTableColumnHeader column={column} title="Price" />
            );
          },
          cell: ({ row }) => {
            const price = row.original.price;
            return <div>{price}{" "}PHP</div>;
          },
        },
        {
          accessorKey: "createdAt",
          header: ({ column }) => {
        
            return (
              <DataTableColumnHeader column={column} title="Inserted at" />
            );
          },
          cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return <div>{formatDate(createdAt)}</div>;
          },
        },
    {
      accessorKey: "creatorId",
      header: ({column}) => {
        return (
          <DataTableColumnHeader column={column} title="Inserted by" />
        )
      },
      cell: ({row}) => {
        const creatorId = row.original.creatorId;
        return <div>{creatorId}</div>
      }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const product = row.original
          const router = useRouter()

          const handleDelete = () => {
            console.log(`Hiding product with ID: ${product.id}`);
          };

          return (
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
                  onClick={() => router.push(`inventory/${product.id}`)}
                >Upate Product</DropdownMenuItem> 
                <DropdownMenuItem
                  onClick={handleDelete}
                >Hide Product</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
  ]
  
//   export const columns: ColumnDef<Products>[] = (products?.length ? Object.keys(products[0]) : []).map((key) => ({
//     accessorKey: key as keyof Products,
//     header: key.charAt(0).toUpperCase() + key.slice(1),
//   }));
