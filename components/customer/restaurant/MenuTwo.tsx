"use client";
import { GetMenuOfRestaurantByRestaurantId } from "@/lib/actions/MenuActions";
import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

const MenuTwo = ({ restaurantId }: any) => {
  const [menu, setMenu] = useState<any>([]);
  const [loading, setLoading] = useState(false);
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
            <MenuCard 
              key={ind} 
              id={m.id}
              restaurantId={restaurantId}
              image={m.image} category={m.category}
              name={m.name}
              quantity_per_price={m.quantity_per_price}
              available_quantities={m.available_quantities}
              price={m.price} 
            />
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default MenuTwo;
