import { prisma } from "@/utils/prismaClient";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/utils/stripe";
import { runCors } from "@/utils/middleware/cors";
import { sendEmail } from "@/utils/emailHelpers";

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
    !status
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
    const newDepositAmount = await prisma.depositAmount.create({
      data: {
        deposit: 20,
        isShared: false,
        vendorId: newVendor.id,
      },
    });

    const adminEmail = "wproinai@gmail.com";
    const adminDashboardUrl = "https://www.wpro.ai/admin/userapproval";

    sendEmail(
      adminEmail,
      "New User Registration - Approval Required",
      `
        <h2>New User Registration</h2>
        <p>A new vendor has registered and requires approval:</p>
        <ul>
          <li>Name: ${full_name}</li>
          <li>Business: ${business_name}</li>
          <li>Email: ${business_email}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <p>Click below to review and approve this user:</p>
        <a href="${adminDashboardUrl}" style="padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">
          Review User
        </a>
      `
    );

    if (subscriptionPlan.name === "Free") {
      return res
        .status(201)
        .json({ message: "User registered successfully", user: newVendor });
    }

    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: subscriptionPlan.id }],
      trial_end: Math.floor(Date.now() / 1000) + 29 * 24 * 60 * 60,
    });

    await prisma.vendorUser.update({
      where: { id: newVendor.id },
      data: {
        subscriptionId: subscriptionPlan.id,
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
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }

    return res.status(500).json({ message: "Unknown error occurred" });
  }
}
