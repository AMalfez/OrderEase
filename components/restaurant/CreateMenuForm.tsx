"use client";
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
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuSchema } from "@/lib/utils/validation/MenuForm";
import { isBase64Image } from "@/lib/utils/Utilities";
import { useUploadThing } from "@/lib/utils/validation/uploadthing";
import { AddItemToMenu } from "@/lib/actions/MenuActions";
const CreateMenuForm = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm({
    resolver: yupResolver(MenuSchema),
    defaultValues: {
      category: "",
      image: "",
      price: 0,
      quantity_per_price: "",
      available_quantities: "",
      name: "",
    },
  });
  async function onSubmit(data: any) {
    const blob = data.image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        data.image = imgRes[0].url;
      }
    }

    try {
      setLoading(true);
      await AddItemToMenu({...data, pathname});
      window.location.reload();
    } catch (error:any) {
      alert(error);
    }
    
    setLoading(false);
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
      <div className="h-fit w-full flex flex-col">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white"
        >
            <FormField
                control={form.control}
                name="image"                
                render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className="text-md font-semibold">Photo of Item</FormLabel>
                    <FormControl>
                    <Input
                        type="file"
                        placeholder="Add an image of item"
                        className="w-full"
                        onChange={(e) => handleImage(e, field.onChange)}
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
                <FormItem className="w-full">
                    <FormLabel className="text-md font-semibold">Item Name</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter dish name" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-semibold">
                  Price of item per unit
                </FormLabel>
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
            name="quantity_per_price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-semibold">Quantity per unit</FormLabel>
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
              <FormItem className="w-full ">
                <FormLabel className="text-md font-semibold">Item Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Non-Veg, Veg, Sweets, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="available_quantities"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-semibold">Available Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Quarter, half, full, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600"
            type={loading?"button":"submit"}
          >
            {loading?"Loading...":"Add to my menu"}
          </Button>
          {/* <Button className="border border-orange-600 bg-white w-full text-orange-600 hover:bg-white">Add +</Button> */}
        </form>
      </div>
    </Form>
  );
};
export default CreateMenuForm;
