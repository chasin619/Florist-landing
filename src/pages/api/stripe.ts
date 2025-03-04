import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getRawBody from "raw-body";
import { stripe } from "@/utils/stripe"; // Corrected import

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const signature = req.headers["stripe-signature"] as string;
  let event: any;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      "whsec_BYG1KdQn57PX4nwP5XIFRCy8KD2FzNyz"
    );
  } catch (err) {
    console.error("Error verifying Stripe webhook signature:", err);
    return res.status(400).json({ error: "Webhook error" });
  }

  if (
    event.type === "checkout.session.completed" &&
    event.data.object.payment_status === "paid"
  ) {
    const metadata = JSON.parse(event.data.object.metadata.userData);

    const user = {
      id: metadata.id,
      full_name: metadata.full_name,
      business_name: metadata.business_name,
      business_email: metadata.business_email,
      password: metadata.password,
      phone: metadata.phone,
      business_address: metadata.business_address,
      website: metadata.website,
      subscriptionPlan: metadata.subscriptionPlan,
    };

    if (metadata.isUpgrade) {
      await axios.post("https://www.wpro.ai/api/user/upgrade-subscription", {
        user,
      });
    } else {
      try {
        await axios.post("https://www.wpro.ai/api/user/register", {
          full_name: metadata.full_name,
          business_name: metadata.business_name,
          business_email: metadata.business_email,
          password: metadata.password,
          phone: metadata.phone,
          business_address: metadata.business_address,
          website: metadata.website,
          subscriptionPlan: metadata.subscriptionPlan,
          status: metadata.status,
        });
      } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  return res.status(200).json({ received: true });
}
