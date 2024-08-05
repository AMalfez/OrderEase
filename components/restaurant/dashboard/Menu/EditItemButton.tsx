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
import { Pen } from "lucide-react"
import EditMenuForm from "../../EditMenuForm"
const EditItemButton = ({data}:any)=>{
    return(
        <Dialog>
            <DialogTrigger asChild>
            <div className="absolute top-5 right-5 bg-white rounded-full p-2 drop-shadow-lg">
                <Pen className="text-neutral-500 hover:text-neutral-600" />
            </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add an Item</DialogTitle>
                    <DialogDescription>
                        Fill the details to add the item to your menu
                    </DialogDescription>
                </DialogHeader>
                <EditMenuForm data={data}/>
            </DialogContent>
      </Dialog>
    )
}

export default EditItemButton;