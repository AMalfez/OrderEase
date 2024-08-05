"use client"

import { useEffect, useState } from "react"
import AddItemButton from "./AddItemButton"
import MenuItems from "./MenuItems"
import { GetMenuOfRestaurant } from "@/lib/actions/MenuActions"
import MenuItemSkeleton from "./MenuItemSkeleton"

const Menu = ()=>{
    const [menu, setMenu] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
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
        setLoading(false);
    }
    return(
        <div className="w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-2">
            {(loading || menu.length===0) && [1,2].map((_:any, ind:number)=>(<MenuItemSkeleton key={ind} />))}
            {!loading && menu.map((m:any, ind:number)=>(<MenuItems data={m} key={ind}/>))}
            <AddItemButton/>
        </div>
    )
}
export default Menu