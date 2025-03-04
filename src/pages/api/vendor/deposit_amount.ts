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
        const depositAmount = await prisma.depositAmount.findUnique({
          where: { vendorId: vendor.id },
        });

        if (!depositAmount) {
          return res.status(404).json({ message: "Deposit amount not found." });
        }
        return res.status(200).json(depositAmount);

      case "POST":
        const { deposit, isShared } = req.body;

        if (typeof deposit !== "number" || deposit < 0) {
          return res.status(400).json({
            message: "A valid deposit amount is required.",
          });
        }

        const newDepositAmount = await prisma.depositAmount.create({
          data: {
            deposit,
            isShared: typeof isShared === "boolean" ? isShared : false,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newDepositAmount);

      case "PUT":
        const { id, ...updateData } = req.body;

        if (
          (updateData.deposit !== undefined &&
            (typeof updateData.deposit !== "number" ||
              updateData.deposit < 0)) ||
          (updateData.isShared !== undefined &&
            typeof updateData.isShared !== "boolean")
        ) {
          return res.status(400).json({
            message: "Valid deposit amount and isShared values are required.",
          });
        }

        const updatedDepositAmount = await prisma.depositAmount.update({
          where: { vendorId: vendor.id },
          data: {
            ...updateData,
          },
        });
        return res.status(200).json(updatedDepositAmount);

      case "DELETE":
        const existingDepositAmount = await prisma.depositAmount.findUnique({
          where: { vendorId: vendor.id },
        });

        if (!existingDepositAmount) {
          return res.status(404).json({ message: "Deposit amount not found." });
        }

        await prisma.depositAmount.delete({
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
