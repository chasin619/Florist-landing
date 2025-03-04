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

  switch (method) {
    case "GET":
      try {
        const deliveryPrices = await prisma.deliverySetupPrice.findMany({
          where: {
            OR: [{ vendorId: vendor.id }, { isShared: true }],
          },
        });
        return res.status(200).json(deliveryPrices);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to fetch delivery setup prices." });
      }

    case "POST":
      const { name, price } = req.body;
      if (!name || typeof price !== "number") {
        return res
          .status(400)
          .json({ message: "Name and price are required." });
      }

      try {
        const newPrice = await prisma.deliverySetupPrice.create({
          data: {
            name,
            price,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newPrice);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create a new delivery setup price." });
      }

    case "PUT":
      const { id, ...data } = req.body;
      if (!id || (data.price && typeof data.price !== "number")) {
        return res
          .status(400)
          .json({ message: "ID and valid price are required." });
      }

      try {
        const updatedPrice = await prisma.deliverySetupPrice.update({
          where: { id },
          data: {
            ...data,
            vendorId: vendor.id,
          },
        });
        return res.status(200).json(updatedPrice);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to update delivery setup price." });
      }

    case "DELETE":
      const { deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ message: "Delete ID is required." });
      }

      try {
        await prisma.deliverySetupPrice.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to delete delivery setup price." });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCors(req, res);
  authenticateToken(req, res, () => handler(req, res));
};
