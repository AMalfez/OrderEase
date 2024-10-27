"use client"

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51NHidkSCTsJY5ezVf5fpcafUVIq0ATRMxBUN8905m9fvSNV3jaZ9mbIKS41IFiOKe7zlYtbg2yIqUXFebRAyZShP00vTIBFHnS');


const PayButton = ({PlaceOrder, setCart, setTotalPrice}:any)=>{
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const { toast } = useToast();

    useEffect(()=>{
        HandlePayment();
    },[])
    const HandlePayment=()=>{
        fetch("/api/payment/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: 1000 }),
          })
            .then((res) => res.json())
            .then((data) => {
              setClientSecret(data.clientSecret);
              // [DEV] For demo purposes only
              setDpmCheckerLink(data.dpmCheckerLink);
            });
    }
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
            {clientSecret&&(<Elements options={{clientSecret}} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>)}
            <button className="px-3 py-1 mt-5 rounded-lg cursor-pointer bg-orange-500 hover:bg-orange-600 text-white" onClick={HandleClick}>
                {loading ? "Loading..." : "Pay now"}
            </button>
        </>
    );
}

export default PayButton