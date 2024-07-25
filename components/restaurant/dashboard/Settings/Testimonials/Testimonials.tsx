"use client"
import { useEffect, useState } from "react";
import TestimonialsSkeleton from "./Skeleton";
import { getAllTestimonials } from "@/lib/actions/FeedbackActions";

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
            {testimonials.filter(t => t.isTestimonial === true).map((t:any, ind:number)=>(
                <div key={ind} className="border py-5 rounded-xl flex flex-col w-1/3 gap-2 justify-center items-center">
                    <p>{t.feedback}</p>
                    <p>{t.user_name}</p>
                </div>
            ))}
        </div>
    )
}
export default Testimonials;