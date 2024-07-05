import Hero from "@/components/customer/Hero"
import HomeCarousel from "@/components/customer/HomeCarousel"

function Page() {
  return (
    <div className="w-screen min-h-screen mb-5">
      <Hero/>
      <HomeCarousel/>
    </div>
  )
}

export default Page