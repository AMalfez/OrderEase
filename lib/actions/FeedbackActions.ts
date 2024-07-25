"use server"

import { Testimonial } from "../constants/testimonials";
import prisma from "./prisma";

export async function postTestimonial(data:Testimonial){
    try{
        const test = await prisma.feedback.create({
            data:{
                ...data
            }
        })
        console.log(test);
        
        return test;
    }catch(err:any){
        throw new Error(err)
    }
}

export async function getAllTestimonials() {
    try {
        const get = await prisma.feedback.findMany();
        console.log(get);
        
        return get;
    } catch (error:any) {
        throw new Error(error);
    }
}