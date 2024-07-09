'use client'
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
import { useState } from "react";
const MenuTwo = () => {
    const [number, setNumber] = useState(0);
  const { toast } = useToast();
    const handleNum=(s:string)=>{
        const num = number;
        if(s==="add") setNumber(num+1);
        else if(num>0) setNumber(num-1);
    }
  return (
    <section className="text-gray-600 body-font pt-40">
      <h1 className="text-center text-3xl font-semibold">
        Select items from Menu
      </h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src="https://dummyimage.com/420x260"
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                Non - Veg
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                Chicken curry
              </h2>
              <div className="flex flex-col items-start justify-between">
                <p className="mt-1">₹100.00/quarter</p>
                <div className="flex items-center justify-between w-full mt-2 mr-2">
                  <div>
                    <Select>
                      <SelectTrigger className="w-[120px] outline-none py-0">
                        <SelectValue placeholder="Quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Quantity per plate</SelectLabel>
                          <SelectItem value="half">Half</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="full">Full</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-center items-center">
                    <button onClick={()=>handleNum("minus")} className="text-white h-5 w-5 flex justify-center items-center cursor-pointer bg-red-500 rounded-lg">
                      -
                    </button>
                    <span className="px-2 text-lg">{number}</span>
                    <button onClick={()=>handleNum("add")} className="text-white h-5 w-5 flex justify-center items-center cursor-pointer bg-green-500 rounded-lg">
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toast({
                      title: "Scheduled: Catch up",
                      description: "Friday, February 10, 2023 at 5:57 PM",
                    });
                  }}
                  className="w-full border mt-3 rounded bg-orange-500 text-white py-1 hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src="https://dummyimage.com/421x261"
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                Shooting Stars
              </h2>
              <p className="mt-1">$21.15</p>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src="https://dummyimage.com/422x262"
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                Neptune
              </h2>
              <p className="mt-1">$12.00</p>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src="https://dummyimage.com/423x263"
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                CATEGORY
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                The 400 Blows
              </h2>
              <p className="mt-1">$18.40</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuTwo;
