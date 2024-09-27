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
import { MoreHorizontal } from "lucide-react";
import { deleteOfferByOfferId } from "@/lib/actions/OfferActions";
export type Offer = { 
    id:string;
    title: string;
    start_date: string;
    desc: string;
    offer_code: string;
    min_price_limit: string;
    discount:string;
}

export const columns: ColumnDef<Offer>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey:"start_date",
        header: "Created At"
    },
    {
        accessorKey: "desc",
        header: "Description"
    },
    {
      accessorKey: "offer_code",
      header: "Offer Code"
  }, 
  {
    accessorKey: "min_price_limit",
    header: "Min. price"
},
{
  accessorKey: "discount",
  header: "Discount"
},
    {
        id: "actions",
        cell: ({ row }) => {
          const OfferId = row.original.id;
          const DleteOffer = async()=>{
            try {
              await deleteOfferByOfferId(OfferId);
              window.location.reload();
            } catch (error:any) {
              alert("unable to delete offer due to an error.")
              console.log(error);
            }
          }
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Offer</DropdownMenuItem>
                <DropdownMenuItem onClick={DleteOffer}>Delete Offer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]