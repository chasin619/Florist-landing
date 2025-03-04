import { prisma } from "@/utils/prismaClient";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/utils/stripe";
import { runCors } from "@/utils/middleware/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    full_name,
    business_name,
    business_email,
    password,
    phone,
    business_address,
    website,
    subscriptionPlan,
    status,
    priceId,
    planName,
  } = req.body;

  if (
    !full_name ||
    !business_name ||
    !business_email ||
    !password ||
    !phone ||
    !business_address ||
    !website ||
    !subscriptionPlan ||
    !status ||
    !priceId ||
    !planName
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingVendorByEmail = await prisma.vendorUser.findUnique({
      where: { business_email },
    });

    if (existingVendorByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingVendorByPhone = await prisma.vendorUser.findUnique({
      where: { phone },
    });

    if (existingVendorByPhone) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const stripeCustomer = await stripe.customers.create({
      email: business_email,
      name: full_name,
      phone: phone,
      metadata: {
        business_name,
        business_address,
        website,
      },
    });

    const newVendor = await prisma.vendorUser.create({
      data: {
        full_name,
        business_name,
        business_email,
        password: hashedPassword,
        phone,
        business_address,
        website,
        subscriptionPlan,
        status,
        customerId: stripeCustomer.id,
      },
    });

    await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: priceId }],
      trial_end: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
    });

    await prisma.vendorUser.update({
      where: { id: newVendor.id },
      data: {
        subscriptionPlan: subscriptionPlan,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newVendor });
  } catch (error) {
    console.error("Error during vendor registration:", error);

    if (error instanceof Error) {
      if (error.message.includes("unique constraint failed")) {
        if (error.message.includes("business_email")) {
          return res.status(400).json({ message: "Email already in use" });
        } else if (error.message.includes("phone")) {
          return res
            .status(400)
            .json({ message: "Phone number already in use" });
        }
      }
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}
