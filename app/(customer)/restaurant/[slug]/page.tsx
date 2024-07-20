import Description from "@/components/customer/restaurant/Description";
import Owner from "@/components/customer/restaurant/Owner";
import Review from "@/components/customer/restaurant/Review";
import { auth } from "@clerk/nextjs/server";

const page = ({ params }: { params: { slug: string } }) => {
  const { userId } : { userId: string | null } = auth();
  return (
    <div>
      <Description slug={params.slug} userId={userId} />
    </div>
  );
};
export default page;
