"use client";

import { getAllTestimonials } from "@/lib/actions/FeedbackActions";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const CreateTestimonials = () => {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => {
    getTestimonials();
  }, [testimonials.length]);
  const getTestimonials = async () => {
    setLoading(true);
    try {
      const test = await getAllTestimonials();
      setTestimonials(test);
    } catch (error: any) {
      console.log(error);
      alert("An error occured");
    }
    setLoading(false);
  };
  if (
    testimonials.filter((t) => t.isTestimonial === true).length === 3 ||
    loading
  )
    return null;
  return (
    <Dialog>
      <DialogTrigger className="w-1/3">
        <div className="border cursor-pointer hover:bg-neutral-50 py-5 rounded-xl flex flex-col w-full gap-2 justify-center items-center">
          <p className="text-5xl text-neutral-400">+</p>
          <p className="text-2xl text-neutral-400">Create</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add testimonials</DialogTitle>
          <DialogDescription>
            Add testimonials to attract more customers. Max 3 allowed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="user_name"
              className="col-span-3"
              placeholder="User"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Testimonial
            </Label>
            <Input
              id="testimonial"
              className="col-span-3"
              placeholder="This is a good restaurant..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTestimonials;
