"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const GetCartByUserId=async()=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try{
        const cart = await prisma.order.findMany({
            where:{
                userId:user.id,
                isOrderPlaced:false
            },
            include:{
                Item: true,
                Restaurant: true
            }
        })
        return cart;
    }catch(error:any){
        throw new Error("An error occured fetching your cart details. Please contact the team.")
    }
}