"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTotalRevenueOfRestaurant } from "@/lib/actions/RestaurantActions";
import { useEffect, useState } from "react";

const OverviewCards = () => {
  const [totalRevenue, setRevenue] = useState<number>(0);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    GetCardsInfo();
  },[])
  const GetCardsInfo = async()=>{
    try {
      setLoading(true);
      const totalRev = await getTotalRevenueOfRestaurant();
      setRevenue(totalRev);
      setLoading(false);
    } catch (error:any) {
      alert(error);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full lg:w-fit h-full mt-10 mb-10">
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle className="font-normal">{loading ? "Loading..." : "Total Revenue"}</CardTitle>
        </CardHeader>
        {!loading && (<CardContent>
          <p className="font-bold text-4xl">₹ {`${totalRevenue}`}</p>
          {/* <p className="text-neutral-500">+20% from last month</p> */}
        </CardContent>)}
      </Card>
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle className="font-normal">Customers live</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">201</p>
          <p className="text-neutral-500">Customers currently being served.</p>
        </CardContent>
      </Card>
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle className="font-normal">Tables booked</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">10</p>
          <p className="text-neutral-500">out of 100 tables</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default OverviewCards;
