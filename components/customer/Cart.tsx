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

import React from "react";
import Script from "next/script";
import { GetCartByUserId } from "@/lib/actions/CartActions";
import { deleteOrderByOrderId, placeOrder } from "@/lib/actions/OrderActions";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import PayButton from "./PayButton";
import { getOffersByRestaurantId } from "@/lib/actions/OfferActions";
import { InitiatePayment, VerifyPayment } from "@/lib/actions/PaymentActions";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [Cart, setCart] = useState<any>([]);
  const [total_price, setTotalPrice] = useState<any>("0");
  const [offer, setOffer] = useState<any>([]);
  const [offerCode, setOfferCode] = useState("");
  const [isOfferApplied, setIsOfferApplied] = useState(false);

  useEffect(() => {
    setIsOfferApplied(false);
    setOfferCode("");
    setOffer([]);
    GetCart();
  }, []);
  const handleOffer = () => {
    const filtered_offer = offer.filter((o: any) => o.OfferCode === offerCode);

    if (filtered_offer.length === 0) {
      setOfferCode("");
      toast({
        description: "No such offer exists.",
      })
    } else if (parseInt(filtered_offer[0].MinLimit) > parseInt(total_price)) {
      console.log("Came here");

      alert(
        
      );
      toast({
        title: "Amount not satisfied.",
        description: `please add ${
          filtered_offer[0].MinLimit - total_price
        } rupees worth of more items to claim offer.`,
      })
    } else {
      setTotalPrice(
        total_price * (1 - parseInt(filtered_offer[0].Discount) / 100)
      );
      setOfferCode("");
      setIsOfferApplied(true);
      setOffer([]);
      toast({
        description:"Offer successfully applied."
      })
    }
  };
  const GetCart = async () => {
    try {
      setLoading(true);
      const cart = await GetCartByUserId();
      console.log(cart, "cart");
      if (cart.length > 0) {
        const offers = await getOffersByRestaurantId(cart[0].Restaurant.id);
        console.log(offers);

        setOffer(offers);
        console.log(cart);
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          total += parseInt(cart[i].total_amount);
        }
        setTotalPrice(`${total}`);
      }
      setCart(cart);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error.",
        description: "An error occured while fetching your cart details.",
      })
    }
  };
  const DeleteCartItem = async (orderId: string) => {
    try {
      setLoading(true);
      await deleteOrderByOrderId(orderId);
      const cart = await GetCartByUserId();
      let total = 0;
      for (let i = 0; i < cart.length; i++) {
        total += parseInt(cart[i].total_amount);
      }
      setTotalPrice(total);
      setCart(cart);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error.",
        description: "An error occured deleting your item.",
      })
    }
  };
  const PlaceOrder = async () => {
    try {
      await placeOrder(Cart[0].userId, Cart[0].Restaurant.id);
      setCart([]);
      setTotalPrice("0");
      window.location.reload;
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error.",
        description: "An error occured placing your item.",
      })
    }
  };
  const pay = async () => {
    try {
      const initiate = await InitiatePayment({
        amount: `${total_price}`,
        to_userId: Cart[0].Restaurant.ownerId,
      });
      const orderId: string = initiate.id;
      var options: any = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: total_price + "00",
        currency: "INR",
        name: Cart[0].Restaurant.restaurant_name,
        description: "Test Transaction",
        image: Cart[0].Restaurant.restaurant_image,
        order_id: orderId,
        handler: async function (response: any) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          const verify = await VerifyPayment({ ...response });
          if (verify) await PlaceOrder();
        },
        notes: {
          address: Cart[0].Restaurant.address,
        },
        theme: {
          color: "#FFA500",
        },
      };
      var rzp1: any = new Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", function (response: any) {
        console.log(response.error);
        toast({
          title: "Error.",
          description: "Can't complete your payment.",
        })
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error.",
        description: error,
      })
    }
  };
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
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
              {Cart.map((invoice: any, ind: number) => (
                <TableRow key={ind}>
                  <TableCell className="font-medium">
                    {invoice.Item.name}
                  </TableCell>
                  <TableCell>{invoice.quantity}</TableCell>
                  <TableCell>{invoice.Restaurant.restaurant_name}</TableCell>
                  <TableCell className="text-right">
                    {invoice.total_amount}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex w-full justify-end pr-3">
                      <Trash2
                        onClick={() => DeleteCartItem(invoice.id)}
                        className="hover:cursor-pointer"
                        size={16}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell
                  className={`text-center ${
                    isOfferApplied ? "text-green-500" : "text-black"
                  }`}
                >
                  ${total_price}.00
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          "Loading..."
        )}
        {Cart.length > 0 && (
          <div className="mt-5">
            <input
              value={offerCode}
              onChange={(e: any) => setOfferCode(e.target.value)}
              placeholder="Input discount code"
              className="rounded-lg outline-none px-3 py-1 bg-gray-100"
            />
            <button
              onClick={handleOffer}
              className="px-3 py-1 ml-2 rounded-lg bg-black text-white"
            >
              Apply
            </button>
          </div>
        )}
        {Cart.length > 0 && (
          <PayButton
            Pay={pay}
            setCart={setCart}
            setTotalPrice={setTotalPrice}
          />
        )}
      </div>
    </>
  );
};
export default Cart;
