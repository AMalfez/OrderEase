"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetCartByUserId } from "@/lib/actions/CartActions";
import { deleteOrderByOrderId, placeOrder } from "@/lib/actions/OrderActions";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import PayButton from "./PayButton";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [Cart, setCart] = useState<any>([]);
  const [total_price, setTotalPrice] = useState<any>("0");
  // const { toast } = useToast();
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
  const PlaceOrder = async()=>{
    try {
      await placeOrder(Cart[0].userId,Cart[0].Restaurant.id);
      window.location.reload
    } catch (error:any) {
      throw new Error("An error occured placing your order.")
    }
  }
  return (
    <div className="w-11/12 md:w-10/12 border mt-10 p-7 rounded-xl">
      <h1 className="text-2xl font-semibold">Your cart</h1>
      {!loading ? (
        <Table>
          <TableHeader>
            <TableRow className="p-0 m-0">
              <TableHead className="w-1/3">Dish</TableHead>
              <TableHead className="w-1/3">Quantity</TableHead>
              <TableHead className="w-1/3">Restaurant</TableHead>
              <TableHead className="text-right w-full">Amount</TableHead>
              <TableHead className="text-right w-full">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Cart.map((invoice:any, ind:number) => (
              <TableRow key={ind}>
                <TableCell className="font-medium">{invoice.Item.name}</TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                <TableCell>{invoice.Restaurant.restaurant_name}</TableCell>
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
      <div className="mt-5">
        <input placeholder="Input discount code" className="rounded-lg outline-none px-3 py-1 bg-gray-100" />
        <button className="px-3 py-1 ml-2 rounded-lg bg-black text-white">Apply</button>
      </div>
      {Cart.length>0 && (<PayButton PlaceOrder={PlaceOrder} setCart={setCart} setTotalPrice={setTotalPrice} />)}
    </div>
  );
};
export default Cart;
