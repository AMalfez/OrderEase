"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils/Utilities";
import { RestaurantSchema } from "@/lib/utils/validation/RestaurantForm";
import { useUploadThing } from "@/lib/utils/validation/uploadthing";
import { GetRestaurantByUserId, updateRestaurantInfoByUserId } from "@/lib/actions/RestaurantActions";

const Restaurant = () => {
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState<any>({});
  const form = useForm({
    resolver: yupResolver(RestaurantSchema),
    defaultValues: {
      restaurant_name: data.restaurant_name,
      restaurant_image: data.restaurant_image,
      tables: 0,
      opening_time: data.opening_time,
      closing_time: data.closing_time,
      address: data.address,
    },
  });
  useEffect(()=>{
    getData();
  },[])
  const getData = async()=>{
      setLoading(true);
      const data = await GetRestaurantByUserId(undefined);
      console.log(data.tables.length);
      setData({...data});
      setLoading(false);
  }
  const onInvalid = (errors: any) => console.log(errors);
  const onSubmit = async (data: any) => {
    console.log(data);
    const tables = new Array(data.tables).fill(false);
    const blob = data.restaurant_image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        data.restaurant_image = imgRes[0].url;
      }
    }
    try {
      setLoading(true);
      const RestoData = await updateRestaurantInfoByUserId({opening_time:data.opening_time, restaurant_image:data.restaurant_image, restaurant_name:data.restaurant_name, closing_time:data.closing_time, tables,address:data.address});
      console.log(RestoData);
      setData({...RestoData});
      toast({
        title: "Updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    router.push("/restaurant/dashboard");
    setLoading(false);
  };
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="p-3">
      <Form {...form}>
        <p className="text-red-500 text-sm">*Only fill those values which you want to update.</p>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="bg-white flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="restaurant_image"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="">
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="profile_icon"
                        width={96}
                        height={96}
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/assets/profile.svg"
                        alt="profile_icon"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Add 400x200 restaurant photo"
                      className="account-form_image-input"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text">
                    Tables in your restaurant
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your number of tables"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="restaurant_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text">Restaurant Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your restaurant name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text">Restaurant Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your restaurant address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="opening_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text">Opening Time</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter in format (Ex): 9:00 am"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closing_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text">Closing Time</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter in format (Ex): 5:00 pm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="" type="submit">
              {loading ? "Loading..." : "Update"}
            </Button>
          </form>
      </Form>
    </div>
  );
};
export default Restaurant;
