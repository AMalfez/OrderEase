import Image from "next/image";
import User from "@/lib/Images/User.jpg";
const Review = ({testimonials}:any) => {
  return (
    <section className="text-gray-600 body-font mt-16">
      <h1 className="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
        Testimonials
      </h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {testimonials.map((t:any, ind:number) => (
            <div key={ind} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <Image
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={t.user_image}
                  height={302}
                  width={302}
                />
                <p className="leading-relaxed">
                  {t.feedback}.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-yellow-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  {t.user_name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Review;
