"use client"
import { Skeleton } from "@/components/ui/skeleton"

const TestimonialsSkeleton = ()=>{
    return(
        <div className="flex gap-2 w-full">
            {Array.from([1,2,3]).map((_,ind)=>(
                <div key={ind} className="border py-5 rounded-xl flex flex-col w-1/3 gap-2 justify-center items-center">
                    <Skeleton className="w-11/12 h-[20px] rounded-full" />
                    <Skeleton className="w-9/12 h-[20px] rounded-full" />
                    <Skeleton className="w-3/12 h-[20px] rounded-full" />
                    <Skeleton className="w-2/12 h-[20px] rounded-full" />
                </div>
            ))}    
        </div>
    )
}

export default TestimonialsSkeleton