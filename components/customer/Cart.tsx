"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const invoices = [
  {
    dish: "Chicken curry",
    quantity: "3 half",
    totalAmount: "₹100.00",
  },
  {
    dish: "Roti",
    quantity: "2",
    totalAmount: "₹100.00",
  },
];

const Cart = () => {
  return (
    <div className="w-11/12 md:w-10/12 border mt-10 p-7 rounded-xl">
        <h1 className="text-2xl font-semibold">Desi Tadka</h1>
      <Table>
        <TableCaption>Your order from Desi Tadka.</TableCaption>
        <TableHeader>
          <TableRow className="p-0 m-0">
            <TableHead className="w-1/3">Dish</TableHead>
            <TableHead className="w-1/3">Quantity</TableHead>
            <TableHead className="text-right w-full">Amount</TableHead>
            <TableHead className="text-right w-full">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice,ind) => (
            <TableRow key={ind}>
              <TableCell className="font-medium">{invoice.dish}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
              <TableCell className="text-right"><div className="flex w-full justify-end pr-3"><Trash2 className="hover:cursor-pointer" size={16} /></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
export default Cart;
