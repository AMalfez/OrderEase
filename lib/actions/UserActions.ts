"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { PostUserFields } from "../constants/user";
import { redirect } from "next/dist/server/api-utils";

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

export async function getLoggedInUser(){
  try {
    const user = await currentUser();
    if(!user) throw new Error("Please login");
    return {user_name: user.username || user.fullName || "User", user_image:user.imageUrl, id:user.id};

  } catch (error:any) {
    throw new Error("Error")
  }
}
