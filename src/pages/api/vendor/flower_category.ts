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
        const flowerCategories = await prisma.flowerCategory.findMany({
          where: {
            OR: [{ vendorId: vendor.id }, { isShared: true }],
          },
        });
        return res.status(200).json(flowerCategories);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to fetch flower categories." });
      }

    case "POST":
      const { name, description } = req.body;
      if (!name || typeof description !== "string") {
        return res
          .status(400)
          .json({ message: "Name and description are required." });
      }

      try {
        const newCategory = await prisma.flowerCategory.create({
          data: {
            name,
            description,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newCategory);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create a new category." });
      }

    case "PUT":
      const { id, ...data } = req.body;
      if (!id || (data.name && typeof data.name !== "string")) {
        return res
          .status(400)
          .json({ message: "ID and valid name are required." });
      }

      try {
        const updatedCategory = await prisma.flowerCategory.update({
          where: { id },
          data: {
            ...data,
            vendorId: vendor.id,
          },
        });
        return res.status(200).json(updatedCategory);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update category." });
      }

    case "DELETE":
      const { deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ message: "Delete ID is required." });
      }

      try {
        await prisma.flowerCategory.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete category." });
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
