import MenuTwo from "@/components/customer/restaurant/MenuTwo";

const Page = ({ params }: { params: { id: string } })=>{
    console.log(params.id);
    
    return(
        <div>
            {/* {params.id} */}
            {/* <Menu/> */}
            <MenuTwo restaurantId={params.id[1]} />
        </div>
    )
}
export default Page;