import { NextApiRequest, NextApiResponse } from "next";
import { runCors } from "@/utils/middleware/cors";
import { stripe } from "@/utils/stripe";
import prisma from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ message: "User are required" });
  }

  try {
    const stripeCustomer = await stripe.customers.create({
      email: user.business_email,
      name: user.full_name,
      phone: user.phone,
      metadata: {
        business_name: user.business_name,
        business_address: user.business_address,
        website: user.website,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: user.subscriptionPlan?.id }],
      trial_end: Math.floor(Date.now() / 1000) + 29 * 24 * 60 * 60,
    });

    await prisma.vendorUser.update({
      where: { id: user.id },
      data: {
        subscriptionId: subscription.id,
        subscriptionPlan: user.subscriptionPlan,
      },
    });

    return res
      .status(200)
      .json({ message: "Subscription upgraded successfully", user });
  } catch (error) {
    console.error("Failed to upgrade subscription:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
