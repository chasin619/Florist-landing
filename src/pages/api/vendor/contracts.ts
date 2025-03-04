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
        const contracts = await prisma.contracts.findMany({
          where: {
            OR: [{ vendorId: vendor.id }, { isShared: true }],
          },
        });
        return res.status(200).json(contracts);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch contracts." });
      }

    case "POST":
      const { title, content, isDefault } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required." });
      }

      try {
        if (isDefault) {
          await prisma.contracts.updateMany({
            where: { vendorId: vendor.id, isDefault: true },
            data: { isDefault: false },
          });
        }

        const newContract = await prisma.contracts.create({
          data: {
            title,
            content,
            isDefault: !!isDefault,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newContract);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create a new contract." });
      }

    case "PUT":
      const { id, ...data } = req.body;
      if (!id || !data.title || !data.content) {
        return res
          .status(400)
          .json({ message: "ID, title, and content are required." });
      }

      try {
        const existingContract = await prisma.contracts.findFirst({
          where: {
            id,
            vendorId: vendor.id,
          },
        });

        if (!existingContract) {
          return res.status(404).json({
            message: "Contract not found or not owned by the vendor.",
          });
        }

        if (data.isDefault) {
          await prisma.contracts.updateMany({
            where: { vendorId: vendor.id, isDefault: true },
            data: { isDefault: false },
          });
        }

        const updatedContract = await prisma.contracts.update({
          where: { id },
          data: {
            ...data,
            vendorId: vendor.id,
          },
        });
        return res.status(200).json(updatedContract);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update contract." });
      }

    case "DELETE":
      const { deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ message: "Delete ID is required." });
      }

      try {
        const existingContract = await prisma.contracts.findFirst({
          where: {
            id: deleteId,
            vendorId: vendor.id,
          },
        });

        if (!existingContract) {
          return res.status(404).json({
            message: "Contract not found or not owned by the vendor.",
          });
        }

        await prisma.contracts.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete contract." });
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
