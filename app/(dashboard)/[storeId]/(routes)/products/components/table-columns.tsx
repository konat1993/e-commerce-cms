"use client"

import { ColumnDef } from "@tanstack/react-table"
import TableActionCell from "./table-action-cell"

export type ProductColumn = {
    id: string
    name: string
    price: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
    size: string
    category: string
    color: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div
                    className="p-2 rounded-full w-min border"
                    style={{ backgroundColor: row.original.color }}
                />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        // accessorKey: "actions",
        // header: "Actions",
        cell: ({ row }) => <TableActionCell data={row.original} />
    },
]
