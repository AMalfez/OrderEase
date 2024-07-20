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