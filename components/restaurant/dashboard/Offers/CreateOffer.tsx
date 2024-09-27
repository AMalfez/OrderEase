"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { createOffer } from "@/lib/actions/OfferActions";
import { SERVER_PROPS_EXPORT_ERROR } from "next/dist/lib/constants";

export function CreateOffer() {
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>({
    error: false,
    message: "",
  });
  const [data, setData] = useState<any>({
    Title: "",
    Description: "",
    OfferCode: "",
    MinLimit: 0,
    Discount: 0,
  });
  const handleSubmit = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await createOffer(data);
      setLoading(true);
      window.location.reload();
    } catch (error: any) {
      alert("An error occured creating your offer.");
    }
  };

  const handleDiscountChange = (e: any) => {
    if (e.target.value > 100) {
      setError({
        error: true,
        message: "Discount should not be more than 100.",
      });
      return;
    }else{
      setError({error:false, message:""})
    }
    setData({ ...data, Discount: e.target.value });
  };
  const handleOfferCodeChange = (e: any) => {
    if (e.target.value.length > 8) {
      setError({
        error: true,
        message: "Code length should be less than 8 characters.",
      });
      return;
    }else{
      setError({error:false, message:""})
    }
    setData({ ...data, OfferCode: e.target.value });
  };
  return (
    <DialogContent className="w-fit">
      <DialogHeader>
        <DialogTitle>Create Offer</DialogTitle>
        <DialogDescription>
          Fill the information and your offer will be created and displayed on
          website home page.
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
            onChange={(e: any) => setData({ ...data, Title: e.target.value })}
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
            onChange={(e: any) =>
              setData({ ...data, Description: e.target.value })
            }
          />
        </div>
        <div>
          <div className="flex gap-3">
            <div className="flex flex-col w-1/2 items-start gap-1">
              <Label htmlFor="offer_code" className="text-right">
                Offer Code
              </Label>
              <Input
                id="offer_code"
                placeholder="Enter a offer code that customers can use to avail offer."
                className="col-span-3"
                value={data.OfferCode}
                min={3}
                max={8}
                onChange={handleOfferCodeChange}
              />
            </div>

            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="discount" className="text-right">
                Discount
              </Label>
              <Input
                id="discount"
                placeholder="How much discount will you give."
                className="col-span-3"
                value={data.Discount}
                max={100}
                type="number"
                onChange={handleDiscountChange}
              />
            </div>
          </div>
          {error.error && (<p className="mt-3 text-xs text-red-500 error">*{`${error.message}`}</p>)}
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="min_price_limit" className="text-right">
            Minimum Price Limit
          </Label>
          <Input
            id="min_price_limit"
            placeholder="Enter min amount after which offer can be availed(can be 0)."
            className="col-span-3"
            value={data.MinLimit}
            type="number"
            onChange={(e: any) =>
              setData({ ...data, MinLimit: e.target.value })
            }
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
        <Button onClick={handleSubmit} type="submit">
          {!loading ? "Save changes" : "Loading..."}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
