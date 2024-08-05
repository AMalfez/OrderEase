"use client"

import { Skeleton } from "@/components/ui/skeleton";

const MenuItemSkeleton = ()=>{
    return(
        <div className="bg-white w-96 hover:cursor-pointer relative rounded-xl p-3 h-fit border-2 border-neutral-300">
            <Skeleton className="h-[260px] w-full rounded-xl" />
            <Skeleton className="mt-3 w-full h-10" />
            <Skeleton className="mt-3 w-full h-10" />
            <Skeleton className="mt-3 w-full h-10" />
            <Skeleton className="mt-3 w-1/2 h-10" />
        </div>
    )
}
export default MenuItemSkeleton;