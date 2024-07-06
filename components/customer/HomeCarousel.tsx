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
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
const HomeCarousel = () => {
  return (
    <div className="w-screen flex justify-center items-center px-3">
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
                {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent> */}
                <Card className="w-fit md:w-full">
                  <CardHeader>
                    <CardTitle>Desi Tadka</CardTitle>
                    <CardDescription>Near IIT Roorkee</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={
                        "https://lh3.googleusercontent.com/myzvDNXes6_iwVDVCj1kk_IGy0m9JeL7B6W5JjD4-2yTOrTaxE1_eVdVMA2Ko-zMftlrpFG56O0FxfuAOeglLyIC46U=w1200-rw"
                      }
                      alt="Desi tadka image"
                      width={400}
                      height={200}
                      className="hidden md:block"
                    />
                    <Image
                      src={
                        "https://lh3.googleusercontent.com/myzvDNXes6_iwVDVCj1kk_IGy0m9JeL7B6W5JjD4-2yTOrTaxE1_eVdVMA2Ko-zMftlrpFG56O0FxfuAOeglLyIC46U=w1200-rw"
                      }
                      alt="Desi tadka image"
                      width={600}
                      height={10}
                      className="block md:hidden object-fill"
                    />
                    <p className="hidden md:block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae dicta voluptate quisquam placeat provident tempora nemo, mollitia ipsum reprehenderit?</p>
                    <p className="block md:hidden">Click to know more</p>
                  </CardContent>
                  <CardFooter>
                    <p className="flex justify-center items-center">
                      <span className="mr-1">3.5</span>
                      {Array.from({length:3}).map((_,ind)=>(
                            <FaStar key={ind} className="text-amber-400" />
                      ))}
                      <FaStarHalfAlt className="text-amber-400" />
                      <FaRegStar className="text-amber-400"/>
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default HomeCarousel;
