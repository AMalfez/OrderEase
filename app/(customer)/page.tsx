import Hero from "@/components/customer/Hero"
import HomeCarousel from "@/components/customer/HomeCarousel"
// import HomeCarouselSkeleton from "@/components/customer/HomeCarouselSkeleton";
import { Offers } from "@/components/customer/Offers"
import { currentUser } from "@clerk/nextjs/server"

async function Page() {
  const user = await currentUser();
  
  return (
    <div className="w-screen min-h-screen mb-5">
      <Hero/>
      <h1 className="mt-16 text-2xl text-center lg:pl-40 lg:text-left font-semibold lg:text-4xl mb-3"><span className="border-b border-orange-400">Best in <span className="text-orange-400">Roorkee</span></span></h1>
      <HomeCarousel userId={user?.id} />
      <h1 className="mt-16 text-2xl text-center lg:pl-40 lg:text-left font-semibold lg:text-4xl mb-3"><span className="border-b border-orange-400">Offers of the <span className="text-orange-400">Week</span></span></h1>
      <Offers/>
    </div>
  )
}

export default Page