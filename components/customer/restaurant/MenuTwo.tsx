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
import { GetMenuOfRestaurantByRestaurantId } from "@/lib/actions/MenuActions";
import { ToastAction } from "@radix-ui/react-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const MenuTwo = ({ restaurantId }: any) => {
  const [menu, setMenu] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const handleNum = (s: string) => {
    const num = number;
    if (s === "add") setNumber(num + 1);
    else if (num > 0) setNumber(num - 1);
  };
  useEffect(() => {
    getMenu();
  }, [restaurantId]);
  const getMenu = async () => {
    setLoading(true);
    try {
      const menu = await GetMenuOfRestaurantByRestaurantId(restaurantId);
      setMenu(menu);
    } catch (error: any) {
      alert(error);
    }
    setLoading(false);
  };
  return (
    <section className="text-gray-600 body-font pt-40">
      <h1 className="text-center text-3xl font-semibold">
        Select items from Menu
      </h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {menu.map((m:any, ind:number)=>(
            <div key={ind} className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a className="block relative h-48 rounded overflow-hidden">
              <Image
                alt="Item image"
                className="object-cover object-center"
                src={m.image}
                width={420}
                height={260}
              />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {m.category}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">
                {m.name}
              </h2>
              <div className="flex flex-col items-start justify-between">
                <p className="mt-1">₹{m.price}.00/{m.quantity_per_price}</p>
                <div className="flex items-center justify-between w-full mt-2 mr-2">
                  <div>
                    <Select>
                      <SelectTrigger className="w-[120px] outline-none py-0">
                        <SelectValue placeholder="Quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{m.available_quantities}</SelectLabel>
                          <SelectItem value="half">Half</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="full">Full</SelectItem>
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
                  onClick={() => {
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
                  }}
                  className="w-full border mt-3 rounded bg-orange-500 text-white py-1 hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default MenuTwo;
