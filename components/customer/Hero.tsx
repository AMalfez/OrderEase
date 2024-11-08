import FoodImg from '@/lib/Images/Food.png'
import Image from 'next/image';
const Hero = ()=>{
    return(
        <section className="w-full h-fit flex flex-col-reverse justify-center items-center pb-5 md:pb-0 md:w-10/12 md:h-4/6 m-auto md:mt-7 md:rounded-3xl bg-orange-300 lg:flex-row">
            <div className="w-4/6 sm:pb-8 lg:w-1/2 flex flex-col lg:pl-20 lg:pr-5 justify-center">
                <p className="text-center text-2xl lg:text-left md:text-4xl font-bold"><span className="text-rose-800">Pre-book</span> your favorate restaurants</p>
                <p className="text-center text-2xl hidden md:block lg:text-left text-white mt-3 pr-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum nulla ratione soluta consequatur quia adipisci exercitationem enim, tempore iure accusantium.</p>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <Image
                    src={FoodImg}
                    alt='Food Image'
                    width={400}
                    height={400}
                    className='pt-4 md:pt-0'
                />
            </div>
        </section>
    )
}
export default Hero;