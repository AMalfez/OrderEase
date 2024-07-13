import CreateMenuForm from "@/components/restaurant/CreateMenuForm"
import { Button } from "@/components/ui/button";

const Page =()=>{
    return(
        <div className="h-screen w-screen flex flex-col justify-center gap-5 items-center bg-orange-100">
            <h1 className="text-2xl lg:text-3xl font-semibold text-neutral-600">Create your Menu</h1>
            <CreateMenuForm/>
        </div>
    )
}
export default Page;