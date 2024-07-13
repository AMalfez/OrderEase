import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OverviewCards = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full lg:w-fit h-full mt-10 mb-10">
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle className="font-normal">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">₹ 100000</p>
          <p className="text-neutral-500">+20% from last month</p>
        </CardContent>
      </Card>
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle className="font-normal">Customers live</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">201</p>
          <p className="text-neutral-500">Customers currently being served.</p>
        </CardContent>
      </Card>
      <Card className="w-full lg:w-96">
        <CardHeader>
          <CardTitle className="font-normal">Tables booked</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">10</p>
          <p className="text-neutral-500">out of 100 tables</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default OverviewCards;
