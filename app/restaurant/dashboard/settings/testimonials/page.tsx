import CreateTestimonials from "@/components/restaurant/dashboard/Settings/Testimonials/CreateTestimonials";

import Testimonials from "@/components/restaurant/dashboard/Settings/Testimonials/Testimonials";
const Page = () => {
  return (
    <div className="w-full pt-4 pl-4">
      <div className="border-b mb-5">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <p className="text-lg text-neutral-400">
          Testimonials helps to build trust with user.
        </p>
        <p className="pb-5 text-red-600">*Only 3 Testimonials allowed</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        {/* <TestimonialsSkeleton/> */}
        <Testimonials />
        <CreateTestimonials />
      </div>
    </div>
  );
};
export default Page;
