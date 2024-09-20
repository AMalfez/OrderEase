"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const createOrder = async(data:any)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const order = await prisma.order.create({
            data:{
                Table_no:data.Table_no,
                total_amount:data.total_amount,
                Item:{
                    connect:{id:data.ItemsId}
                },
                Restaurant:{
                    connect: {id:data.restaurantId}
                },
                userId: user.id,
                status: data.status,
                quantity: data.quantity
            },
            include:{
                Restaurant:true,
                Item: true
            }
        })
        return order;
    } catch (error:any) {
        console.log(error);
        
        throw new Error("There is an error creating your order.")
    }
}

export const placeOrder = async(orderId:string)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const placeOrder = await prisma.order.update({
            where:{
                id:orderId
            },
            data:{
                isOrderPlaced:true,
                status:"preparing"
            }
        });
        //send email to engage customer. code here
        return placeOrder;
    } catch (error:any) {
        throw new Error("An error occurred placing your order.")
    }
}

export const updateOrderStatus = async(orderId:string,status:string)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try{
        const updatedStatus = await prisma.order.update({
            where:{id:orderId},
            data:{status:status}
        })
        //send email on update
    }catch(error:any){
        throw new Error("An error occured updating status.");
    }
}

export const deleteOrderByOrderId = async(orderId:string)=>{
    try {
        const afterDeleting = await prisma.order.delete({
            where: {id:orderId}
        })
        return afterDeleting;
    } catch (error:any) {
        console.log(error);
        throw new Error("an error occured deleting your item.");
    }
}