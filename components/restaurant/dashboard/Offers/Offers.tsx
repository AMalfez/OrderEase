import { DataTable } from "./DataTable"
import {Offer, columns} from './Columns';
import { TrimStringToDotted } from "@/lib/utils/Utilities";
export const Offers = ()=>{
    const date = new Date();
    date.setDate(11);
    const data: Offer[] =[
        {
            title: TrimStringToDotted("Get a Lip smacking taste at mind smacking price",0,10),
            desc: TrimStringToDotted("Get 50% Off on all the items above ₹1000.",0,10),
            start_date: date.toLocaleDateString("en-US"),
            end_date: new Date().toLocaleDateString("en-US")
        },
        {
            title: TrimStringToDotted("Lip smacking taste at mind smacking price",0,10),
            desc: TrimStringToDotted("Get 50% Off on all the items above ₹1000.",0,10),
            start_date: date.toLocaleDateString("en-US"),
            end_date: new Date().toLocaleDateString("en-US")
        }
    ]
    return(
        <div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}