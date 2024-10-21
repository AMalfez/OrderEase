"use client"
import { useEffect, useState } from "react";
import TestimonialsSkeleton from "./Skeleton";
import { getAllTestimonials } from "@/lib/actions/TestimonialAction";

const Testimonials = ()=>{
    const [loading,setLoading] = useState(false);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    useEffect(()=>{
        getTestimonials();
    },[testimonials.length])
    const getTestimonials = async()=>{
        setLoading(true);
        try {
            const test = await getAllTestimonials();
            setTestimonials(test);
        } catch (error:any) {
            console.log(error);
            alert("An error occured");
        }
        setLoading(false);
    }
    if(loading){
        return(
            <TestimonialsSkeleton/>
        )
    }
    return(
        <div className="flex gap-2 w-full">
            {testimonials.map((t:any, ind:number)=>(
                <div key={ind} className="border p-5 min-h-44 rounded-xl flex flex-col w-1/3 gap-2 justify-center items-center">
                    <p className="text-xl text-center">&quot;{t.testimonial}&quot;</p>
                    <p className="text-xl text-neutral-500">{t.user_name}</p>
                </div>
            ))}
        </div>
    )
}
export default Testimonials;