import Description from "@/components/customer/restaurant/Description";
import Owner from "@/components/customer/restaurant/Owner";
import Review from "@/components/customer/restaurant/Review";
import { restaurant_url_map } from "@/lib/DummyData";
import { auth } from "@clerk/nextjs/server";

const page = ({ params }: { params: { slug: string } }) => {
  const { userId } : { userId: string | null } = auth();
    const data = restaurant_url_map.filter((f:any)=> f.url === `/${params.slug}`)
  return (
    <div>
      {/* Hi {params.slug} */}
      <Description slug={params.slug} name={data[0].name} userId={userId} />
      <Review/>
      <Owner/>
    </div>
  );
};
export default page;
