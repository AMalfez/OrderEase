"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const GetCartByUserId=async()=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try{
        const cart = await prisma.cart.findUnique({
            where:{
                userId:user.id
            },
            include:{
                Orders: {
                    include: {
                        Items: true,
                        Restaurant:true
                    }
                }
            }
        })
        return cart;
    }catch(error:any){
        throw new Error("An error occured fetching your cart details. Please contact the team.")
    }
}

export const AddItemToCart = async(data:any)=>{
    const user = await currentUser();
    if(!user) redirect("sign-in");
    try {
        const isAlreadyCartThere = await prisma.cart.findUnique({
            where:{
                userId:user.id
            }
        })
        if(isAlreadyCartThere) {
            await prisma.cart.update
        }
    } catch (error:any) {
        throw new Error("Can't add items to cart currently due to some technical issue.")
    }
}