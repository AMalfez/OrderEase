import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewCards from "./Overview/OverviewCards";
import OverviewChart from "./Overview/OverviewChart";
import { OrderTable } from "./Orders/OrderTable";
import { Offers } from "./Offers/Offers";

const Overview = () => {
  return (
    <div className="px-16">
      <h1 className="mt-16 text-4xl font-bold">Dashboard</h1>
      <Tabs defaultValue="overview" className="w-full h-fit mt-10">
        <TabsList>
          <TabsTrigger value="overview" className="text-lg">Overview</TabsTrigger>
          <TabsTrigger value="notifications" className="hidden md:block text-lg">Notification</TabsTrigger>
          <TabsTrigger value="orders" className="text-lg">Orders</TabsTrigger>
          <TabsTrigger value="offers" className="text-lg">Offers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="flex flex-col lg:flex lg:flex-row gap-8 items-center">
          <OverviewCards/>
          <OverviewChart/>
        </TabsContent>
        <TabsContent value="notifications">Change your password here.</TabsContent>
        <TabsContent value="orders">
          <OrderTable/>
        </TabsContent>
        <TabsContent value="offers">
          <Offers/>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Overview;
