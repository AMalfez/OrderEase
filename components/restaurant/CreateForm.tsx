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
import { RestaurantSchema } from "@/lib/utils/validation/RestaurantForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(RestaurantSchema),
    defaultValues: {
      restaurant_name: "",
      restaurant_image: "",
      tables: 0,
      opening_time: "",
      closing_time: "",
    },
  });

  function onSubmit(data: any) {
    console.log(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setLoading(true);
    router.push("/restaurant/create-menu")
  }
  const handleImage = (e: any, fieldChange: (value: string) => void) => {
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
            name="restaurant_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Photo of restaurant</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Add a profile"
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
