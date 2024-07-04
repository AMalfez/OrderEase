import FoodImg from '@/lib/Images/Food.png'
import Image from 'next/image';
const Hero = ()=>{
    return(
        <section className="w-10/12 h-4/6 m-auto mt-7 rounded-3xl bg-orange-300 flex">
            <div className="w-1/2 flex flex-col pl-20 pr-5 justify-center">
                <p className="text-4xl font-bold"><span className="text-rose-800">Pre-book</span> your favorate restaurants</p>
                <p className="text-2xl text-white mt-3 pr-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum nulla ratione soluta consequatur quia adipisci exercitationem enim, tempore iure accusantium.</p>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <Image
                    src={FoodImg}
                    alt='Food Image'
                    width={400}
                    height={400}
                />
            </div>
        </section>
    )
}
export default Hero;