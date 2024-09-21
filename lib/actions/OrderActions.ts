"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { GetCartByUserId } from "./CartActions";
import { GetRestaurantByUserId } from "./RestaurantActions";
import { revalidatePath } from "next/cache";

export const createOrder = async(data:any)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const orders = await GetCartByUserId();
        if(orders.length==0 || (orders[0].Restaurant.id == data.restaurantId)){
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
                    // userId: user.id,
                    status: data.status,
                    quantity: data.quantity,
                    User:{
                        connect:{userId:user.id}
                    }
                },
                include:{
                    Restaurant:true,
                    Item: true
                },
                
            })
            return order;
        }else{
            throw new Error("An order already exists in your cart from another restaurant.")
        }
    } catch (error:any) {
        console.log(error);
        
        throw new Error("There is an error creating your order.")
    }
}

export const placeOrder = async(userId:string, restaurantId:string)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const updatedOrder = await prisma.order.updateMany({
            where:{
                restaurantId,
                userId,
                isOrderPlaced:false
            },
            data:{
                isOrderPlaced:true,
                status:"preparing"
            }
        });
        //send email to engage customer. code here
        revalidatePath("/cart")
        return updatedOrder;
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

export const getAllOrdersOfRestaurant = async()=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const restaurant = await GetRestaurantByUserId(user.id);
        console.log("Restaurant",restaurant);
        
        const orders = await prisma.order.findMany({
            where:{restaurantId:restaurant?.id, isOrderPlaced:true},
            include:{
                User: true
            }
        });
        console.log("Orders",orders)
        return orders;
    } catch (error:any) {
        throw new Error(error);
    }
}