import MenuTwo from "@/components/customer/restaurant/MenuTwo";

const Page = ({ params }: { params: { id: string } })=>{
    return(
        <div>
            {/* {params.id} */}
            {/* <Menu/> */}
            <MenuTwo/>
        </div>
    )
}
export default Page;