"use server"

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs/server";
import { GetRestaurantByUserId } from "./RestaurantActions";

export const AddItemToMenu = async(data:any)=>{
    const user = await currentUser();
    if(!user) throw new Error("Please login.")
    const restaurant = await GetRestaurantByUserId(user.id);
    if(!restaurant) throw new Error("Please create a restaurant first to add menu.")
    try {
        const addItem = await prisma.item.create({
            data:{
                available_quantities:data.available_quantities,
                category: data.category,
                image: data.image,
                name: data.name,
                price: ""+data.price,
                quantity_per_price: data.quantity_per_price,
                Restaurant: {
                    connect: {
                        id: restaurant.id,
                    }
                }
            },
        })
        if(data.pathname==="/restaurant/dashboard/menu") revalidatePath(`${data.pathname}`);
        return addItem;
    } catch (error:any) {
        console.log(error);
        
        throw new Error("An error occured adding your item to menu. Please try again later.")
    }
}

export const GetMenuOfRestaurant = async() => {
    const user = await currentUser();
    if(!user) throw new Error("Please login.")
    const restaurant = await GetRestaurantByUserId(user.id);
    if(!restaurant) throw new Error("Please create a restaurant first to add menu.")
    try {
        const Menu = await prisma.item.findMany({
            where:{
                restaurantId: restaurant.id,
            }
        })
        return Menu;
    } catch (error:any) {
        throw new Error("Can't fetch Menu currently.")
    }
}

export const GetMenuOfRestaurantByRestaurantId = async(id:string)=>{
    try {
        const menu = await prisma.item.findMany({
            where:{
                restaurantId:id,
            }
        })
        return menu;
    } catch (error:any) {
        console.log(error);
        
        throw new Error("Can't fetch the Menu. Please contact team.")
    }
}