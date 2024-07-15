"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Offer = { 
    title: string;
    start_date: string;
    end_date: string;
    desc: string;
}

export const columns: ColumnDef<Offer>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "start_date",
        header: "Start Date"
    },
    {
        accessorKey: "end_date",
        header: "End Date"
    },
    {
        accessorKey: "desc",
        header: "Description"
    }
]