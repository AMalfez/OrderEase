"use server"

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GetRestaurantByUserId } from "./RestaurantActions";
import prisma from "./prisma";

export const createOffer = async(data:any)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const restaurant = await GetRestaurantByUserId(user.id);
        const offer = await prisma.offer.create({
            data:{
                Description:data.Description,
                Title:data.Title,
                Restaurant:{
                    connect:{
                        id:restaurant?.id
                    }
                }
            }
        })
        return offer;
    } catch (error:any) {
        console.log(error);
        throw new Error("Unable to create offer.");
    }
}

export const getAllOffers = async()=>{
    try {
        const offer = await prisma.offer.findMany();
        return offer;
    } catch (error:any) {
        console.log(error);
        throw new Error("Unable to create offer.");
    }
}

export const getOffersByRestaurantId = async()=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const restaurant = await GetRestaurantByUserId(user.id);
        const offer = await prisma.offer.findMany({
            where:{
                restaurantId:restaurant?.id
            }
        })
        return offer;
    } catch (error:any) {
        console.log(error);
        throw new Error("Unable to create offer.");
    }
}

export const deleteOfferByOfferId = async(OfferId:string)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const offer = await prisma.offer.delete({
            where:{
                id:OfferId
            }
        })
        return offer;
    } catch (error:any) {
        console.log(error);
        throw new Error("Unable to create offer.");
    }
}