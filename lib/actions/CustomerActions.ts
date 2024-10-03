"use server"

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { GetRestaurantByUserId } from "./RestaurantActions";

export const getCustomersByRestaurantId = async()=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const restaurant = await GetRestaurantByUserId(user.id);
        if(!restaurant) return [];
        const customers = await prisma.user.findMany({
            where:{
                Orders:{
                    every:{
                        restaurantId: restaurant?.id,
                    }
                }
            }
        })
        return customers;
    } catch (error:any) {
        throw new Error(error);
    }
}