"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TableNumberInput({slug,userId}:any) {
    const router = useRouter();
    const [tableNum, setTableNum] = useState("");
    const createOrder = () => {
        if(tableNum==="") alert("please input valid table number");
        else router.push(`/restaurant/${slug}/createOrder/${userId}/${slug}?TableNumber=${tableNum}`);
      };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
        >
          Create order
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter your table number</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={tableNum}
              onChange={(e:any)=>setTableNum(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
          onClick={() => createOrder()}
          >
            Go to Menu
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
