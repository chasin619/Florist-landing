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
        const laborCost = await prisma.laborCost.findUnique({
          where: { vendorId: vendor.id },
        });

        if (!laborCost) {
          return res.status(404).json({ message: "Labor cost not found." });
        }
        return res.status(200).json(laborCost);

      case "POST":
        const { costPerHour, costPerMinute } = req.body;

        if (
          typeof costPerHour !== "number" ||
          costPerHour < 0 ||
          typeof costPerMinute !== "number" ||
          costPerMinute < 0
        ) {
          return res.status(400).json({
            message: "Valid costPerHour and costPerMinute are required.",
          });
        }

        const newLaborCost = await prisma.laborCost.create({
          data: {
            costPerHour,
            costPerMinute,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newLaborCost);

      case "PUT":
        const { id, ...data } = req.body;

        if (
          !id ||
          (data.costPerHour !== undefined &&
            (typeof data.costPerHour !== "number" || data.costPerHour < 0)) ||
          (data.costPerMinute !== undefined &&
            (typeof data.costPerMinute !== "number" || data.costPerMinute < 0))
        ) {
          return res
            .status(400)
            .json({ message: "Valid ID and cost values are required." });
        }

        const updatedLaborCost = await prisma.laborCost.update({
          where: { vendorId: vendor.id },
          data: {
            ...data,
          },
        });
        return res.status(200).json(updatedLaborCost);

      case "DELETE":
        const existingLaborCost = await prisma.laborCost.findUnique({
          where: { vendorId: vendor.id },
        });

        if (!existingLaborCost) {
          return res.status(404).json({ message: "Labor cost not found." });
        }

        await prisma.laborCost.delete({
          where: { vendorId: vendor.id },
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
