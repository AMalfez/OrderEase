import Image from "next/image";
const Review = ({testimonials}:any) => {
  return (
    <section className="text-gray-600 body-font mt-16">
      <h1 className="sm:text-3xl text-2xl text-center font-medium title-font mb-4 text-gray-900">
        Testimonials
      </h1>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex items-center flex-wrap -m-4">
          {testimonials.map((t:any, ind:number) => (
            <div key={ind} className="lg:w-1/3 lg:mb-0 mb-6 p-4 w-full">
              <div className="h-full text-center">
                <p className="leading-relaxed">
                  {t.testimonial}.
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
