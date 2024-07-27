"use server"

import { currentUser } from "@clerk/nextjs/server"
import { GetRestaurantByUserId } from "./RestaurantActions"
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { TestimonialData } from "../constants/testimonials";
import { revalidatePath } from "next/cache";

export async function getAllTestimonials(){
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const rest = await GetRestaurantByUserId(user.id);
        if(!rest) redirect("/")
        const testimonials = await prisma.testimonial.findMany({
            where:{
                restaurantId:rest.id
            }
        })
        console.log(testimonials);
        
        return testimonials;
    } catch (error:any) {
        throw new Error("Unable to fetch testimonials.")
    }
}

export async function postTestimonial(data:TestimonialData, path:string){
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
        const rest = await GetRestaurantByUserId(user.id);
        if(!rest) redirect("/");
        const test = await getAllTestimonials();
        if(test.length >= 3) {
            throw new Error("Can't have more than 3 testimonials.");
        }
        const post = await prisma.testimonial.create({
            data:{
                ...data,
                restaurantId: rest.id, 
            }
        })
        console.log(path);
        
        if(path==="/restaurant/dashboard/settings/testimonials") revalidatePath(path);
        return post;
    } catch (error:any) {
        throw new Error("Unable to post testimonial");
    }
}

export async function getTestimonialsByRestId(id:string) {
    try {
        const tests = await prisma.testimonial.findMany({
            where:{
                restaurantId:id
            }
        })
        return tests;
    } catch (error:any) {
        throw new Error("can't fetch testimonials of this restaurant")
    }
}