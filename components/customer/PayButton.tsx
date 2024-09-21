"use client"

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";
const PayButton = ({PlaceOrder, setCart, setTotalPrice}:any)=>{
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    // const HandlePayment=()=>{}
    const HandleClick = async()=>{
        setLoading(true);
        await PlaceOrder();
        setCart([]);
        setLoading(false);
        setTotalPrice("0");
        toast({
            title: "Order placed successfully.",
            description: "You will recieve order shortly. Please hang on tight. Meanwhile you can explore the menu.",
          })
    }
    return(
        <>
            <button className="px-3 py-1 mt-5 rounded-lg cursor-pointer bg-orange-500 hover:bg-orange-600 text-white" onClick={HandleClick}>{loading ? "Loading..." : "Pay now"}</button>
        </>
    );
}

export default PayButton