import Description from "@/components/customer/restaurant/Description";
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
