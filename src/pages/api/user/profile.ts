import { NextApiRequest, NextApiResponse } from "next";
import { JwtPayload } from "jsonwebtoken";
import { authenticateToken } from "@/utils/middleware/jwt";
import { runCors } from "@/utils/middleware/cors";
import prisma from "@/utils/prisma";

export interface CustomRequest extends NextApiRequest {
  user?: string | JwtPayload;
}

async function fetchVendorProfile(req: CustomRequest, res: NextApiResponse) {
  if (!req.user || typeof req.user === "string") {
    return res.status(403).json({ message: "User not authenticated" });
  }

  const vendorId = req.user.id;

  try {
    const vendorProfile = await prisma.vendorUser.findUnique({
      where: { id: vendorId },
    });

    if (!vendorProfile) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json(vendorProfile);
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default async function handler(
  req: CustomRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  authenticateToken(req, res, async () => {
    if (req.method === "GET") {
      await fetchVendorProfile(req, res);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
