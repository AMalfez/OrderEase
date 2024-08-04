"use client"

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Pen } from "lucide-react";
const MenuItems = ({data}:any)=>{
    return(
        <div className="w-96 hover:cursor-pointer relative rounded-xl p-3 h-fit border-2 border-neutral-300">
            <Image
                src={data.image}
                alt="Item image"
                width={420}
                height={260}
                className="rounded-xl object-contain"
            />
            <div className="absolute top-5 right-5 bg-white rounded-full p-2 drop-shadow-lg">
                <Pen className="text-neutral-500 hover:text-neutral-600" />
            </div>
            <p className="text-lg text-neutral-500 mt-3">{data.category}</p>
            <p className="font-semibold text-xl">{data.name}</p>
            <p className="mt-2 text-lg">₹ {data.price} for {data.quantity_per_price}</p>
            <p className="text-lg">Available Quantity: {data.available_quantities}</p>
            <button className="py-2 w-full bg-orange-500 mt-1 text-white rounded-xl">Delete Item</button>
        </div>
    )
}
export default MenuItems;