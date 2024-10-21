"use client"
import { DataTable } from "./DataTable"
import {Offer, columns} from './Columns';
import { TrimStringToDotted } from "@/lib/utils/Utilities";
import { useEffect, useState } from "react";
import { getOffersByRestaurantId } from "@/lib/actions/OfferActions";
export const Offers = ()=>{
    const [loading, setLoading] = useState(false);
    const [Data, setData] = useState<Offer[]>([]);
    useEffect(()=>{
        getOfferData();
    },[])
    const getOfferData = async()=>{
        setLoading(true);
        try {
            const offer = await getOffersByRestaurantId(undefined);
            const data: Offer[] = [];
            for(let i=0; i<offer.length; i++){
                data.push({
                    id:offer[i].id,
                    title: TrimStringToDotted(offer[i].Title,0,20),
                    desc: TrimStringToDotted(offer[i].Description,0,50),
                    start_date:`${new Date(offer[i].createdAt).toLocaleDateString()}`,
                    offer_code: offer[i].OfferCode,
                    min_price_limit:offer[i].MinLimit,
                    discount:offer[i].Discount+"%"
                })
            }
            setData(data);
        } catch (err:any) {
            alert("An error occured fetching offers details.")
        }
        setLoading(false);
    }
    // const data: Offer[] =[
    //     {
    //         title: TrimStringToDotted("Get a Lip smacking taste at mind smacking price",0,20),
    //         desc: TrimStringToDotted("Get 50% Off on all the items above ₹1000.",0,80),
    //         start_date: `${new Date()}`,
    //     },
    //     {
    //         title: TrimStringToDotted("Lip smacking taste at mind smacking price",0,20),
    //         desc: TrimStringToDotted("Get 50% Off on all the items above ₹1000.",0,80),
    //         start_date: `${new Date()}`,
    //     }
    // ]
    return(
        <div>
            {!loading ? (<DataTable columns={columns} data={Data}/>):(<div>Loading...</div>)}
        </div>
    )
}