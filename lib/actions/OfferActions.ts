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
        const isOfferExist = await prisma.offer.findMany({
            where:{
                restaurantId:restaurant?.id,
                OfferCode: data.OfferCode
            }
        });
        if(isOfferExist.length>0) throw new Error("An offer with this code already exist for your restaurant. please change the name.")
        const offer = await prisma.offer.create({
            data:{
                Description:data.Description,
                Title:data.Title,
                OfferCode:data.OfferCode,
                MinLimit:data.MinLimit+"",
                Discount:""+data.Discount,
                Restaurant:{
                    connect:{
                        id:restaurant?.id
                    }
                }
            }
        })
        return offer;
    } catch (error:any) {
        // console.log(error);
        throw new Error(error);
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
        // if(!restaurantId){
            const restaurant = await GetRestaurantByUserId(user.id);
            const offer = await prisma.offer.findMany({
                where:{
                    restaurantId:restaurant?.id
                }
            })
            return offer;
        // } else {
        //     const offer = await prisma.offer.findMany({
        //         where:{
        //             restaurantId:restaurantId
        //         }
        //     })
        //     return offer;
        // }
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
