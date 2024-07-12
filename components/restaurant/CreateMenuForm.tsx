"use client"
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuSchema } from "@/lib/utils/validation/MenuForm";
const CreateMenuForm =()=>{
    const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
    const form = useForm({
        resolver: yupResolver(MenuSchema),
        defaultValues: {
          category: "",
          image: "",
          price: 0,
          quantity_for_price: "",
          available_quantities: "",
          name: ""
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
    return(
        <Form {...form}>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-orange-100">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-11/12 space-y-6 border p-8 rounded-2xl bg-white shadow-2xl shadow-orange-500"
        >
        <p className="text-center mb-2 text-2xl md:text-4xl font-semibold">Create your <span className="text-orange-800">restaurant</span></p>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Photo of Item</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Add an image of item"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Price of item per unit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price of item per unit"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter dish name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity_for_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Quantity per unit</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Quarter, 1 slice, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Item Category</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Non-Veg, Veg, Sweets, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="available_quantities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Available Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Quarter, half, full, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-xl" type="submit">Create</Button>
        </form>
      </div>
    </Form>
    )
}
export default CreateMenuForm;