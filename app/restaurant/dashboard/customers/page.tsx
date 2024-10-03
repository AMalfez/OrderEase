import { columns } from "@/components/restaurant/dashboard/Customer/Columns"
import { DataTable } from "@/components/restaurant/dashboard/Customer/DataTable"

const Page =()=>{
    const data = [
        {
            id:"123",
            name:"Alfez",
            email:"alfaizmanusuri47@gmail.com"
        }
    ]
    return(
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
export default Page