import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require("stripe")('sk_test_51NHidkSCTsJY5ezV8hPORBAP3lwQWhvkeQOipGi99okezd2OPF8z6uvtxwwvHg503va1SnMbUTcrMBh2PAllGBrm00PhTekcYD');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("here!");
    if (req.method === 'POST') {
        try {
            
            
            const {price} = JSON.parse(req.body);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(price),
                currency: "inr",
                automatic_payment_methods: {
                    enabled: true,
        },
      });
    
      res.send({
          clientSecret: paymentIntent.client_secret,
          // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
          dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    } catch (error:any) {
        console.log(error);
            
    }
    } else {
      res.status(500).json({message:"Invalid response type"})
    }
  }