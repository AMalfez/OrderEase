"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import Razorpay from 'razorpay';
import prisma from "./prisma";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const InitiatePayment = async({amount, to_userId}:any)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try{
        let instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` })
        const options:any = {
            amount: parseInt(amount)*100,
            currency: "INR"
        }
        let x:any = await instance.orders.create(options);
        await prisma.payment.create({
            data:{
                amount,
                order_id:x.id,
                to_userId,
                from_userId:user.id,
                status:"initiated"
            }
        });
        return x;
    }catch(error:any){
        console.log(error);
        throw new Error(error);
    }
}

export const VerifyPayment = async({razorpay_order_id,razorpay_payment_id,razorpay_signature}:any)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const p = await prisma.payment.findMany({where:{
            order_id:razorpay_order_id
        }})
        if(!p) {
            throw new Error("Order id not found.");
        }else{
            let x:any = validatePaymentVerification({"order_id":razorpay_order_id, "payment_id":razorpay_payment_id},razorpay_signature,`${process.env.RAZORPAY_KEY_SECRET}`);
            if(x){
                const completed = await prisma.payment.updateMany({
                    where:{
                        order_id:razorpay_order_id
                    },
                    data:{
                        status:"completed"
                    }
                })
                return completed;
            }
        }
    } catch (error:any) {
        throw new Error(error);
    }
}