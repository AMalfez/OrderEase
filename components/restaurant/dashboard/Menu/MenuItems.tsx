"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Image from "next/image";
import { Pen } from "lucide-react";
import { DeleteMenuItemById } from "@/lib/actions/MenuActions";
import EditItemButton from "./EditItemButton";
const MenuItems = ({data}:any)=>{
    const deleteItem = async()=>{
        try {
            await DeleteMenuItemById(data.id);
            window.location.reload();
        } catch (error:any) {
            alert(error);
        }
    }
    return(
        <div className="bg-white w-96 hover:cursor-pointer relative rounded-xl p-3 h-fit border-2 border-neutral-300">
            <Image
                src={data.image}
                alt="Item image"
                width={420}
                height={260}
                className="rounded-xl object-contain"
            />
            {/* <div className="absolute top-5 right-5 bg-white rounded-full p-2 drop-shadow-lg">
                <Pen className="text-neutral-500 hover:text-neutral-600" />
            </div> */}
            <EditItemButton data={data} />
            <p className="text-lg text-neutral-500 mt-3">{data.category}</p>
            <p className="font-semibold text-xl">{data.name}</p>
            <p className="mt-2 text-lg mb-2">₹ {data.price} for {data.quantity_per_price}</p>
            <Select >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Available Quantity" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {data.available_quantities.map((m:any,ind:number)=>(<SelectItem key={ind} value={m}>{m}</SelectItem>))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <button onClick={deleteItem} className="py-2 w-full bg-orange-500 mt-2 text-white rounded-xl">Delete Item</button>
        </div>
    )
}
export default MenuItems;