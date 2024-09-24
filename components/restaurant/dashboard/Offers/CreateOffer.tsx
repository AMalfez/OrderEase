"use client"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { createOffer } from "@/lib/actions/OfferActions"

export function CreateOffer() {
  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState<any>({
    Title:"",
    Description:"",
  })
  const handleSubmit = async()=>{
    if(loading) return;
    try {
      setLoading(true);
      await createOffer(data);
      setLoading(true);
      window.location.reload();
    } catch (error:any) {
      alert("An error occured creating your offer.")
    }
  }
  return (
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Create Offer</DialogTitle>
          <DialogDescription>
            Fill the information and your offer will be created and displayed on website home page.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-8 py-4">
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Type a catchy line EX: Get a Lip smacking taste at mind smacking price."
              className="col-span-3"
              value={data.Title}
              onChange={(e:any)=> setData({...data, Title:e.target.value})}
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input
              id="desc"
              placeholder="Type a brief desecription of the offer here."
              className="col-span-3"
              value={data.Description}
              onChange={(e:any)=>setData({...data, Description:e.target.value})}
            />
          </div>
          <div className="flex items-center space-x-2">
          <Checkbox id="notify" />
          <label
            htmlFor="notify"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Notify all customers through mail
          </label>
        </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">{!loading ? "Save changes":"Loading..."}</Button>
        </DialogFooter>
      </DialogContent>
  )
}
