"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { CreateRestaurantFields } from "../constants/user";
import { redirect } from "next/navigation";

export async function GetRestaurantByUserId(userId: string | undefined) {
  if (!userId) return;
  try {
    const rest = await prisma.restaurant.findUnique({
      where: {
        ownerId: userId,
      },
    });
    if (!rest) throw new Error("There is no restaurant with this owner.");
    console.log(rest);
    console.log(rest.restaurant_name);
    return rest;
  } catch (error: any) {
    console.log(error);
    throw new Error("There is an error fetching restaurant.");
  }
}

export async function GetAllRestaurant() {
  try {
    const rest = await prisma.restaurant.findMany();
    console.log(rest);
    return rest;
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured fetching all restaurant.");
  }
}

export async function createRestaurant(data: CreateRestaurantFields) {
  const { userId } = auth();
  if (!userId) throw new Error("User not loggedin.");

  try {
    const rest = await prisma.restaurant.findUnique({
      where: {
        ownerId: userId + "",
      },
    });
    if (rest)
      throw new Error(
        "You already own a restaurant. Can't create multiple restaurant."
      );
    else {
      const rest = await prisma.restaurant.create({
        data: {
          restaurant_name: data.restaurant_name,
          closing_time: data.closing_time,
          opening_time: data.opening_time,
          restaurant_image: data.restaurant_image,
          ownerId: userId,
          tables: data.tables,
          address: data.address,
        },
      });
      await prisma.user.update({
        where: {
          userId: userId + "",
        },
        data: {
          restaurantId: rest.id,
          role: "owner",
        },
      });
      console.log(rest);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured creating restaurant.");
  }
}

export async function getRestaurantByRestaurantId(id: string) {
  try {
    const rest = await prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
    console.log(rest);
    return rest;
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured fetching the restaurant.");
  }
}

export async function getAllOrderInfoOfRestaurant(){
    const user = await currentUser();
    if(!user) redirect("/sign-in");
    try {
      const restaurant = await GetRestaurantByUserId(user.id);
      const orders = await prisma.order.findMany({
        where:{
          isOrderPlaced:true,
          restaurantId:restaurant?.id
        }
      })
      return orders
    } catch (error:any) {
      console.log(error);
      
      throw new Error("Unable to fetch info. Please contact team at team@orderease.com")
    }
}

export async function getTotalRevenueOfRestaurant(){
  try {
    const orders = await getAllOrderInfoOfRestaurant();
    let revenue=0;
    for(let i=0; i<orders.length; i++){
      revenue += parseInt(orders[i].total_amount);
    }
    return revenue;
  } catch (error:any) {
    throw new Error("Unable to fetch revenue. Please contact team at team@orderease.com")
  }
}
