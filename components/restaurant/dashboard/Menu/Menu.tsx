"use client"

import { useEffect, useState } from "react"
import AddItemButton from "./AddItemButton"
import MenuItems from "./MenuItems"
import { GetMenuOfRestaurant } from "@/lib/actions/MenuActions"

const Menu = ()=>{
    const [menu, setMenu] = useState<any>([]);
    useEffect(()=>{
        getMenu();
    },[])
    const getMenu = async()=>{
        try {
            const Menu = await GetMenuOfRestaurant();
            console.log(Menu);
            
            setMenu(Menu)
        } catch (error:any) {
            alert(error);
        }
    }
    return(
        <div className="w-fit grid grid-cols-3 grid-flow-row gap-2">
            {menu.map((m:any, ind:number)=>(<MenuItems data={m} key={ind}/>))}
            <AddItemButton/>
        </div>
    )
}
export default Menu