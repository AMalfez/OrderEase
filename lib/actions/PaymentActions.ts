"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import Razorpay from 'razorpay';
import prisma from "./prisma";

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