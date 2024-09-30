"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const bookTable = async(Table_no:string, restaurant_id:string)=>{
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try{
        const tables = await prisma.restaurant.findUnique({
            where:{
                id:restaurant_id
            }
        })
        if(!tables?.tables[parseInt(Table_no)-1]){
            throw new Error("Table is already booked.");
        }
        //complete further
    }catch(err:any){
        throw new Error("An error occured booking table.")
    }
}