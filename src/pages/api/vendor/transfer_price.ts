import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "@/utils/middleware/jwt";
import { CustomRequest } from "@/utils/middleware/jwt";
import { runCors } from "@/utils/middleware/cors";
import prisma from "@/utils/prisma";

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  const { method } = req;
  const vendor = req.vendor;

  if (!vendor) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Vendor information is missing." });
  }

  try {
    switch (method) {
      case "GET":
        const transferPrices = await prisma.transferPrice.findMany({
          where: {
            OR: [{ vendorId: vendor.id }, { isShared: true }],
          },
        });
        return res.status(200).json(transferPrices);

      case "POST":
        const { name, price } = req.body;

        if (!name || typeof price !== "number") {
          return res
            .status(400)
            .json({ message: "Name and a valid price are required." });
        }

        const newTransferPrice = await prisma.transferPrice.create({
          data: {
            name,
            price,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newTransferPrice);

      case "PUT":
        const { id, ...data } = req.body;

        if (!id || (data.price && typeof data.price !== "number")) {
          return res
            .status(400)
            .json({ message: "Valid ID and price are required." });
        }

        const updatedTransferPrice = await prisma.transferPrice.update({
          where: { id },
          data: {
            ...data,
            vendorId: vendor.id,
          },
        });
        return res.status(200).json(updatedTransferPrice);

      case "DELETE":
        const { deleteId } = req.body;

        if (!deleteId) {
          return res.status(400).json({ message: "Delete ID is required." });
        }

        await prisma.transferPrice.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCors(req, res);
  authenticateToken(req, res, () => handler(req, res));
};
