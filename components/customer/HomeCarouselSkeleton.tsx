"use client"
import { Skeleton } from "@/components/ui/skeleton";
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
const HomeCarouselSkeleton = () => {
  return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-9/12 md:w-10/12"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="w-fit md:w-full">
                  <CardHeader>
                    <CardTitle>
                        <Skeleton className="w-full h-[40px]" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="w-1/2 h-[20px]" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Skeleton
                      className="w-full h-[200px] hidden md:block object-contain"
                    />
                    
                    <div className="block md:hidden"><Skeleton className="w-1/2 h-[20px]" /></div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-center items-center">
                      <span className="mr-1"><Skeleton className="w-[60px] h-[20px]" /></span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  );
};
export default HomeCarouselSkeleton;
