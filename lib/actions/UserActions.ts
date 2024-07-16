"use server";

import { UserFields } from "../constants/user";
import prisma from "./prisma";

export async function PostUser({
  userId,
  name,
  image,
  email,
  password,
  role,
  restaurantId,
}: UserFields) {
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
          password,
          role,
          restaurantId,
        },
      });
      console.log(newuser);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("an error occured");
  }
}

export async function getUser(userId:string){
    try {
        const user = await prisma.user.findUnique({
            where:{
                userId,
            }
        })
        if(!user) throw new Error("User does not exist.");
        else{
            console.log(user);
            return user;
        }
    } catch (error:any) {
        console.log(error);
        throw new Error("An error occured fetching user details.")
    }
}
