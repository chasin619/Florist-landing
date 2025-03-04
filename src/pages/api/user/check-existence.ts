import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { runCors } from "@/utils/middleware/cors";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { business_email, phone } = req.body;

  if (!business_email && !phone) {
    return res.status(400).json({ message: "Email and Phone is required" });
  }

  try {
    const user = await prisma.vendorUser.findMany({
      where: {
        OR: [
          { business_email },
          { phone }
        ]
      }
    });

    if (user.length > 0) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
