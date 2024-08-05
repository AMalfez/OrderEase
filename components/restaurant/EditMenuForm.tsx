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
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuSchema } from "@/lib/utils/validation/MenuForm";
import { isBase64Image } from "@/lib/utils/Utilities";
import { useUploadThing } from "@/lib/utils/validation/uploadthing";
import { EditItemById } from "@/lib/actions/MenuActions";
import { Label } from "@/components/ui/label"

const EditMenuForm = ({data}:any) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [tempQuantity, setTemp] = useState("");
  const [available_quatities, setAvailable] = useState<String[]>(data.available_quantities);
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm({
    resolver: yupResolver(MenuSchema),
    defaultValues: {
      category: data.category,
      image: data.image,
      price: data.price,
      quantity_per_price: data.quantity_per_price,
      name: data.name,
    },
  });
  const deleteQuantity=(ind:number)=>{
    const new_quantity = available_quatities.filter((q:String)=> q!=available_quatities[ind]);
    setAvailable(new_quantity);
  }
  const handleAvailableQuantity = ()=>{
    setAvailable([...available_quatities, tempQuantity]);
    setTemp("");
  }
  async function onSubmit(data: any) {
      setLoading(true);
      const blob = data.image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        data.image = imgRes[0].url;
      }
    }

    try {
      await EditItemById(data.id,{...data});
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
          <div>
              <Label htmlFor="available_quantities" className="text-md font-semibold">Available Quantity</Label>
              <div className="flex gap-2">
                <Input type="text" value={tempQuantity} onChange={(e:any)=>setTemp(e.target.value)} id="available_quantities" placeholder="Ex: Half, Quarter, 5, etc." />
                <button type="button" className="text-2xl hover:text-neutral-500 font-semibold text-neutral-400" onClick={handleAvailableQuantity}>+</button>
              </div>
              <div className="mt-2 flex gap-2">
                {available_quatities.map((q:any,ind:number)=>(
                  <span className="rounded-lg bg-orange-400 p-2 text-white" key={ind}>{q}<span className="ml-2 cursor-pointer" onClick={()=>deleteQuantity(ind)}>x</span></span>
                ))}
              </div>
          </div>
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600"
            type={loading?"button":"submit"}
          >
            {loading?"Loading...":"Update Item"}
          </Button>
        </form>
      </div>
    </Form>
  );
};
export default EditMenuForm;
