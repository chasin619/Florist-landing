import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export interface CustomRequest extends NextApiRequest {
  user?: string | JwtPayload;
  vendor?: JwtPayload;
}

interface DecodedToken extends JwtPayload {
  id?: number;
}

export async function authenticateToken(
  req: CustomRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const vendorIdFromParams = parseInt(req.query.vendorId as string, 10);

    console.log("Vendor ID from Params:", vendorIdFromParams);
    console.log("Token:", token);

    if (!token && !vendorIdFromParams) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token or vendor ID provided" });
    }

    if (vendorIdFromParams) {
      // Fetch vendor by ID from query params
      const vendor = await prisma.vendorUser.findUnique({
        where: { id: vendorIdFromParams },
      });

      console.log("Vendor from DB (Params):", vendor);

      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      req.vendor = vendor;
      return next();
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      console.log("Decoded token:", decoded);

      if (!decoded.id) {
        return res
          .status(403)
          .json({ message: "Forbidden: Vendor ID not found in token" });
      }

      const vendor = await prisma.vendorUser.findUnique({
        where: { id: decoded.id },
      });

      console.log("Vendor from DB (Token):", vendor);

      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      req.user = decoded;
      req.vendor = vendor;
      return next();
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
