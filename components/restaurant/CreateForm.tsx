"use client";

import { useForm } from "react-hook-form";
import { useUploadThing } from "@/lib/utils/validation/uploadthing";

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
import { RestaurantSchema } from "@/lib/utils/validation/RestaurantForm";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createRestaurant } from "@/lib/actions/RestaurantActions";
import { isBase64Image } from "@/lib/utils/Utilities";
import Image from "next/image";

export function CreateForm() {
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(RestaurantSchema),
    defaultValues: {
      restaurant_name: "",
      restaurant_image: "",
      tables: 0,
      opening_time: "",
      closing_time: "",
      address:""
    },
  });

  const onSubmit = async(data: any) => {
    alert("click")
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
      await createRestaurant({opening_time:data.opening_time, restaurant_image:data.restaurant_image, restaurant_name:data.restaurant_name, closing_time:data.closing_time, tables,address:"Near roorkee"})
      router.push("/restaurant/dashboard")
      setLoading(true);
    } catch (error:any) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
    
    setLoading(false);
    router.push("/restaurant/create-menu")
  }
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
    <Form {...form}>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-orange-100">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 lg:w-1/3 space-y-6 border p-8 rounded-2xl bg-white shadow-2xl shadow-orange-500"
        >
        <p className="text-center mb-2 text-2xl md:text-4xl font-semibold">Create your <span className="text-orange-800">restaurant</span></p>
        <FormField
          control={form.control}
          name='restaurant_image'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile_icon'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile_icon'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Add restaurant photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="tables"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Tables in your restaurant</FormLabel>
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
                <FormLabel className="text-xl">Restaurant Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your restaurant name" {...field} />
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
                <FormLabel className="text-xl">Opening Time</FormLabel>
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
                <FormLabel className="text-xl">Closing Time</FormLabel>
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
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-xl" type="submit">{loading ? "Loading...":"Create"}</Button>
        </form>
      </div>
    </Form>
  );
}
