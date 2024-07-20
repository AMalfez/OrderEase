"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Restaurant } from "@/lib/constants/restaurant";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GetAllRestaurant } from "@/lib/actions/RestaurantActions";
import HomeCarouselSkeleton from "./HomeCarouselSkeleton";

const HomeCarousel = ({userId}:any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [rest, setRest] = useState<Restaurant[] | undefined>(undefined);

  useEffect(()=>{
    setLoading(true);
    getRestByUserId();
    setLoading(false);
  },[userId])
  const getRestByUserId=async()=>{
    try {
      const Rest = await GetAllRestaurant();
      console.log(Rest);
      
      setRest(Rest)
    } catch (error:any) {
      console.log(error);
    }
  }
  const showRestaurant = (s: string) => {
    router.push(`/restaurant/${s}`);
  };
  return (
    <div className="w-screen flex justify-center items-center px-3">
      {(loading || !rest) && (<HomeCarouselSkeleton/>)}
      {(!loading && rest) && (<Carousel
        opts={{
          align: "start",
        }}
        className="w-9/12 md:w-10/12"
      >
        <CarouselContent>
          {rest.map((r, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div
                onClick={() => showRestaurant(r.id)}
                className="p-1"
              >
                <Card className="w-fit md:w-full hover:bg-neutral-100  cursor-pointer">
                  <CardHeader>
                    <CardTitle>{r.restaurant_name}</CardTitle>
                    <CardDescription>{r.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={
                        `${r.restaurant_image}`
                      }
                      alt={`${r.restaurant_name} image`}
                      width={400}
                      height={200}
                      className="hidden md:block object-contain"
                    />
                    <Image
                      src={
                        `${r.restaurant_image}`
                      }
                      alt={`${r.restaurant_name} image`}
                      width={600}
                      height={10}
                      className="block md:hidden object-fill"
                    />
                    <p className="block md:hidden">Click to know more</p>
                  </CardContent>
                  <CardFooter>
                    <p className="flex justify-center items-center">
                      <span className="mr-1">{r.rating}</span>
                      {Array.from({ length: Math.ceil(parseInt(r.rating)) }).map((_, ind) => (
                        <FaStar key={ind} className="text-amber-400" />
                      ))}
                      {Array.from({ length: Math.ceil(parseInt(r.rating) - Math.floor(parseInt(r.rating)))+1 }).map((_, ind) => (
                        <FaStarHalfAlt className="text-amber-400" />
                      ))}
                      {Array.from({length: 4 - Math.ceil(parseInt(r.rating))}).map((_,ind)=>(
                        <FaRegStar className="text-amber-400" />
                      ))}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>)}
    </div>
  );
};
export default HomeCarousel;
