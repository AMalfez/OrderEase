'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Nonveg from "@/lib/Images/Non-veg.png";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

export function Offers() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <div className="w-full flex justify-center px-3">
    <Carousel
      plugins={[plugin.current]}
      className="w-9/12 md:w-10/12"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="h-fit md:h-72 md:px-16 rounded-lg flex flex-col-reverse md:flex-row bg-gradient-to-r from-orange-600 to-orange-300">
                  <div className="w-full text-center md:text-left md:w-3/4 h-fit md:h-72 flex flex-col justify-center">
                    <p className="text-2xl w-full md:text-4xl font-semibold text-white mb-4">Get <span className="text-yellow-400 border-b-4 border-amber-400">35% off</span> on you first order of any non veg item.</p>
                    <p className="text-xl font-semibold text-white">Visit now at <span className="text-amber-300">Desi tadka</span></p>
                    <p className="text-white font-semibold"> Offer Ends in: <span className="text-amber-100 font-normal">1day 1hr 35min 00sec</span></p>
                  </div>
                  <div className="w-full md:w-1/4 h-fit md:h-72 flex justify-center items-center">
                    <Image
                      alt="this is an ofer image"
                      src={Nonveg}
                      width={350}
                      className="object-cover"
                      height={350}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}
