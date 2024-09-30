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
import { getOffersByRestaurantId } from "@/lib/actions/OfferActions";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@radix-ui/react-toast";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [Cart, setCart] = useState<any>([]);
  const [total_price, setTotalPrice] = useState<any>("0");
  const [offer,setOffer] = useState<any>([]);
  const [offerCode, setOfferCode] = useState("");
  const [isOfferApplied,setIsOfferApplied] = useState(false);
  
  useEffect(() => {
    setIsOfferApplied(false);
    setOfferCode("");
    setOffer([]);
    GetCart();
  }, []);
  const handleOffer = ()=>{
    const filtered_offer = offer.filter((o:any) => o.OfferCode === offerCode);
    if(filtered_offer.length === 0) {
      setOfferCode("");
      alert("No such offer exists.")
    }else if(filtered_offer[0].MinLimit > total_price){
      alert(`please add ${filtered_offer[0].MinLimit - total_price} rupees worth of more items to claim offer.`)
    }else{
      setTotalPrice(total_price*(1-(parseInt(filtered_offer[0].Discount)/100)));
      setOfferCode("");
      setIsOfferApplied(true);
      setOffer([]);
      alert("Offer applied successfully.");
    }
  }
  const GetCart = async () => {
    try {
      setLoading(true);
      const cart = await GetCartByUserId();
      const offers = await getOffersByRestaurantId(cart[0].Restaurant.id);
      setOffer(offers);
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
              <TableCell className={`text-center ${isOfferApplied ? "text-green-500":"text-black"}`}>${total_price}.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        "Loading..."
      )}
      <div className="mt-5">
        <input value={offerCode} onChange={(e:any)=>setOfferCode(e.target.value)} placeholder="Input discount code" className="rounded-lg outline-none px-3 py-1 bg-gray-100" />
        <button onClick={handleOffer} className="px-3 py-1 ml-2 rounded-lg bg-black text-white">Apply</button>
      </div>
      {Cart.length>0 && (<PayButton PlaceOrder={PlaceOrder} setCart={setCart} setTotalPrice={setTotalPrice} />)}
    </div>
  );
};
export default Cart;
