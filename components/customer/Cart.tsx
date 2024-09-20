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
import { GetCartByUserId } from "@/lib/actions/CartActions";
import { deleteOrderByOrderId } from "@/lib/actions/OrderActions";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const invoices = [
  {
    dish: "Chicken curry",
    quantity: "3 half",
    order_quantity: "5",
    totalAmount: "₹100.00",
  },
  {
    dish: "Roti",
    quantity: "2",
    order_quantity: "5",
    totalAmount: "₹100.00",
  },
];

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [Cart, setCart] = useState<any>([]);
  const [total_price, setTotalPrice] = useState<any>("0");
  useEffect(() => {
    GetCart();
  }, []);
  const GetCart = async () => {
    try {
      setLoading(true);
      const cart = await GetCartByUserId();
      console.log(cart);
      let total=0;
      for(let i=0; i<cart.length; i++){
        total+=parseInt(cart[i].total_amount);
      }
      setTotalPrice(`${total}`);
      setCart(cart);
      setLoading(false);
    } catch (error: any) {
      alert("An error occured fetching your cart.");
    }
  };
  const DeleteCartItem = async(orderId:string) => {
    try {
      setLoading(true);
      await deleteOrderByOrderId(orderId);
      const cart = await GetCartByUserId();
      let total=0;
      for(let i=0; i<cart.length; i++){
        total+=parseInt(cart[i].total_amount);
      }
      setTotalPrice(total);
      setCart(cart);
      setLoading(false);
    } catch (error:any) {
      alert("An error occured deleting your item.");
    }
  }
  return (
    <div className="w-11/12 md:w-10/12 border mt-10 p-7 rounded-xl">
      <h1 className="text-2xl font-semibold">Desi Tadka</h1>
      {!loading ? (
        <Table>
          <TableCaption>Your order from Desi Tadka.</TableCaption>
          <TableHeader>
            <TableRow className="p-0 m-0">
              <TableHead className="w-1/3">Dish</TableHead>
              <TableHead className="w-1/3">Quantity</TableHead>
              {/* <TableHead className="w-1/3">Order Quantity</TableHead> */}
              <TableHead className="text-right w-full">Amount</TableHead>
              <TableHead className="text-right w-full">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Cart.map((invoice:any, ind:number) => (
              <TableRow key={ind}>
                <TableCell className="font-medium">{invoice.Item.name}</TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                {/* <TableCell>{invoice.order_quantity}</TableCell> */}
                <TableCell className="text-right">
                  {invoice.total_amount}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex w-full justify-end pr-3">
                    <Trash2 onClick={()=>DeleteCartItem(invoice.id)} className="hover:cursor-pointer" size={16} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-center">${total_price}.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
export default Cart;
