"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createOrder } from "@/lib/actions/OrderActions";
import { ToastAction } from "@radix-ui/react-toast";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderData } from "@/lib/constants/order";
import { useState } from "react";

const MenuCard = ({
  image,
  category,
  name,
  quantity_per_price,
  available_quantities,
  price,
  id,
  restaurantId
}: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Table_no = searchParams.get('TableNumber')
  const [number, setNumber] = useState(0);
  const [orderData, setOrderData] = useState<OrderData>({
    isOrderPlaced:false,
    ItemsId:id,
    restaurantId:restaurantId,
    status:"not-placed",
    Table_no:Table_no||"0",
    total_amount:`${price*number}`,
    quantity:`${number}`
  })
  const { toast } = useToast();
  if(!Table_no) return;
  const handleNum = (s: string) => {
    let num = number;
    if (s === "add") {
      num++;
      setNumber(num);
    }
    else if (num > 0) {
      num--;
      setNumber(num);
    }
    setOrderData({...orderData,total_amount:`${price*num}`, quantity:`${num}`});
  };
  const CreateOrder = async()=>{
    if(orderData==undefined){
      toast({
        title: "Please select items to add in cart.",
        description: "No item selected to add in cart. Please select one.",
      })
      return;
    }
    try {
      const order = await createOrder(orderData);
      if(order){
        toast({
          title: "Item added to cart.",
          action: (
            <ToastAction
              altText="View cart"
              className="px-4 py-2 rounded-lg bg-orange-400 text-white"
              onClick={() => router.push("/cart")}
            >
              View cart
            </ToastAction>
          ),
        });
      }
    } catch (error:any) {
      toast({
        title: "An error occured.",
        description: `${error}`,
      })
    }
  }
//   const addToCart
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative h-48 rounded overflow-hidden">
        <Image
          alt="Item image"
          className="object-cover object-center"
          src={image}
          width={420}
          height={260}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
        <div className="flex flex-col items-start justify-between">
          <p className="mt-1">
            ₹{price}.00/{quantity_per_price}
          </p>
          <div className="flex items-center justify-between w-full mt-2 mr-2">
            <div>
              <Select>
                <SelectTrigger className="w-[120px] outline-none py-0">
                  <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Quantities</SelectLabel>
                    {available_quantities.map((m: string, ind: number) => (
                      <SelectItem value={m} key={ind}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleNum("minus")}
                className="text-white h-5 w-5 flex justify-center items-center cursor-pointer bg-red-500 rounded-lg"
              >
                -
              </button>
              <span className="px-2 text-lg">{number}</span>
              <button
                onClick={() => handleNum("add")}
                className="text-white h-5 w-5 flex justify-center items-center cursor-pointer bg-green-500 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => CreateOrder()}
            className="w-full border mt-3 rounded bg-orange-500 text-white py-1 hover:bg-orange-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default MenuCard;
