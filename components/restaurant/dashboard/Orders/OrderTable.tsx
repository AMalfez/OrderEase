"use client"
import { getAllOrdersOfRestaurant } from "@/lib/actions/OrderActions";
import { Payment, columns } from "./Columns"
import { DataTable } from "./DataTable"
import { useEffect, useState } from "react";
export const OrderTable = () => {
  const [OrderData, setOrderData] = useState<any>([]);
  const [data,setData] = useState<Payment[]>([]);
  useEffect(()=>{
    getAllOrders();
  },[])
  const getAllOrders = async()=>{
    try {
      const orders = await getAllOrdersOfRestaurant();
      console.log(orders);
      
      if(orders) {
        setOrderData(orders);
        const temp:Payment[] = []
        orders.forEach(order => {
          temp.push({
            id:order.id,
            amount: order.total_amount,
            email: order.User.email,
            name: order.User.name,
            quantity: order.quantity,
            table_no: order.Table_no
          })
        });
        setData(temp);
      }
    } catch (error:any) {
      alert("An error occured fetching your orders.")
    }
  }
    // const data:Payment[] = [
      // {
      //   id: OrderData.id,
      //   amount: OrderData.total_amount,
      //   email: OrderData.User.email,
      //   name: OrderData.User.name,
      //   table_no: OrderData.Table_no,
      //   // order_status: "fulfilled",
      //   quantity:OrderData.quantity
      // },
    //   {
    //     id: "728ed52f",
    //     amount: "100",
    //     email: "m@example.com",
    //     name: "Alfez",
    //     table_no: "2",
    //     // order_status: "fulfilled",
    //     quantity:"2"
    //   }
    // ]
  return (
  <div>
    <DataTable columns={columns} data={data} />
  </div>
);
};
