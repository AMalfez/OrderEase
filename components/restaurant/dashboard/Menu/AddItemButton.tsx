"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateMenuForm from "../../CreateMenuForm"
const AddItemButton = ()=>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="border-2 border-neutral-300 hover:cursor-pointer rounded-2xl w-96 h-fit flex flex-col justify-center items-center pt-3 pb-5">
                    <p className="text-6xl text-neutral-300">+</p>
                    <p className="text-4xl text-neutral-300">Add Item</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add an Item</DialogTitle>
                    <DialogDescription>
                        Fill the details to add the item to your menu
                    </DialogDescription>
                </DialogHeader>
                <CreateMenuForm/>
            </DialogContent>
      </Dialog>
    )
}

export default AddItemButton;