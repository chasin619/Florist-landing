import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

import { authenticateToken } from "@/utils/middleware/jwt";
import { CustomRequest } from "@/utils/middleware/jwt";
import { runCors } from "@/utils/middleware/cors";

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
        const colors = await prisma.color.findMany({
          where: {
            OR: [{ vendorId: vendor.id }, { isShared: true }],
          },
        });

        return res.status(200).json(colors);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch colors." });
      }

    case "POST":
      const { name, hexCode } = req.body;
      if (!name || !hexCode) {
        return res
          .status(400)
          .json({ message: "Name and hexCode are required." });
      }

      try {
        const newColor = await prisma.color.create({
          data: {
            name,
            hexCode,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newColor);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create a new color." });
      }

    case "PUT":
      const { id, ...data } = req.body;
      if (!id || (data.hexCode && typeof data.hexCode !== "string")) {
        return res
          .status(400)
          .json({ message: "ID and a valid hexCode are required." });
      }

      try {
        const existingColor = await prisma.color.findFirst({
          where: {
            id,
            vendorId: vendor.id,
          },
        });

        if (!existingColor) {
          return res
            .status(404)
            .json({ message: "Color not found or not owned by the vendor." });
        }

        const updatedColor = await prisma.color.update({
          where: { id },
          data: {
            ...data,
            vendorId: vendor.id,
          },
        });
        return res.status(200).json(updatedColor);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update color." });
      }

    case "DELETE":
      const { deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ message: "Delete ID is required." });
      }

      try {
        // Check if the color belongs to the vendor before deleting
        const existingColor = await prisma.color.findFirst({
          where: {
            id: deleteId,
            vendorId: vendor.id,
          },
        });

        if (!existingColor) {
          return res
            .status(404)
            .json({ message: "Color not found or not owned by the vendor." });
        }

        await prisma.color.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete color." });
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
