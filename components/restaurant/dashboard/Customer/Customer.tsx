"use client"
import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { getCustomersByRestaurantId } from "@/lib/actions/CustomerActions";

const Customer = ()=>{
    const [data,setData] = useState<any>([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        getCustomerData();
    },[])
    const getCustomerData = async()=>{
        try {
            setLoading(true);
            const customerData = await getCustomersByRestaurantId();
            const filteredData = [];
            for(let i=0; i<customerData.length; i++){
                if(customerData[i].userId==='undefined' || !customerData[i].userId) continue;
                filteredData.push({
                    id: customerData[i].id,
                    name:customerData[i].name,
                    email:customerData[i].email
                });
            }
            console.log(customerData);
            
            setData([...filteredData]);
            setLoading(false);
        } catch (error:any) {
            alert(error);
        }
    }
    // const data = [
    //     {
    //         id:"123",
    //         name:"Alfez",
    //         email:"alfaizmanusuri47@gmail.com"
    //     }
    // ]
    return(
        <div className="container mx-auto py-10">
            {loading ? (<div>Loading...</div>) : (<DataTable columns={columns} data={data}/>)}
        </div>
    )
}
export default Customer;