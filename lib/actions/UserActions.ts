"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { CreateRestaurantFields, PostUserFields } from "../constants/user";

export async function PostUser({ userId, name, image, email }: PostUserFields) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });
    if (user) {
      throw new Error("User already exist");
    } else {
      const newuser = await prisma.user.create({
        data: {
          userId,
          name,
          profile_photo: image,
          email,
        },
      });
      console.log(newuser);
      return newuser;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("an error occured");
  }
}

export async function getUserByUserId(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });
    if (!user) return null;
    else {
      console.log(user);
      return user;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured fetching user details.");
  }
}

export async function getUserId() {
  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);
  console.log(user?.username);
  return user?.id;
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
        },
      });
      const user = await prisma.user.update({
        where: {
          userId: userId + "",
        },
        data: {
          restaurantId: rest.id,
          role:"owner"
        },
      });
      console.log(rest);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured creating restaurant.");
  }
}
