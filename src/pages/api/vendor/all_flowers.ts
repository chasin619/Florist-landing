import { NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "@/utils/middleware/jwt";
import { CustomRequest } from "@/utils/middleware/jwt";
import { runCors } from "@/utils/middleware/cors";
import { uploadImageToS3 } from "@/utils/s3";
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
        const flowers = await prisma.flower.findMany({
          where: {
            OR: [{ userId: vendor.id }, { isShared: true }],
          },
        });

        return res.status(200).json({ data: flowers });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch flowers." });
      }

    case "POST":
      const {
        name,
        colorId,
        stemsPerBunch,
        costPerStem,
        costPerBunch,
        supplier,
        imageData,
        flowerCategoryId,
        isShared,
      } = req.body;

      if (
        !name ||
        !colorId ||
        !stemsPerBunch ||
        !costPerStem ||
        !costPerBunch ||
        !imageData
      ) {
        return res.status(400).json({
          message:
            "Name, colorId, stemsPerBunch, costPerStem, costPerBunch, and imageData are required.",
        });
      }

      try {
        const imageFilename = `${Date.now()}_${name.replace(/\s+/g, "_")}.jpg`;
        const imageUrl = await uploadImageToS3(
          imageData,
          imageFilename,
          "Flowers",
          "image/jpeg"
        );

        const newFlower = await prisma.flower.create({
          data: {
            name,
            colorId,
            stemsPerBunch,
            costPerStem,
            costPerBunch,
            supplier,
            imageFilename: imageUrl,
            userId: vendor.id,
            flowerCategoryId,
            isShared,
          },
        });
        return res.status(201).json(newFlower);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create a new flower." });
      }

    case "PUT":
      const { id, imageData: newImageData, ...data } = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID is required." });
      }

      try {
        const existingFlower = await prisma.flower.findFirst({
          where: {
            id,
            userId: vendor.id,
          },
        });

        if (!existingFlower) {
          return res
            .status(404)
            .json({ message: "Flower not found or not owned by the vendor." });
        }

        // Upload new image if provided
        let imageFilename = existingFlower.imageFilename;
        if (newImageData) {
          const newImageFilename = `${Date.now()}_${
            data.name?.replace(/\s+/g, "_") || "updated"
          }.jpg`;
          imageFilename = await uploadImageToS3(
            newImageData,
            newImageFilename,
            "Flowers",
            "image/jpeg"
          );
        }

        const updatedFlower = await prisma.flower.update({
          where: { id },
          data: {
            ...data,
            imageFilename,
            userId: vendor.id,
          },
        });
        return res.status(200).json(updatedFlower);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update flower." });
      }

    case "DELETE":
      const { deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ message: "Delete ID is required." });
      }

      try {
        const existingFlower = await prisma.flower.findFirst({
          where: {
            id: deleteId,
            userId: vendor.id,
          },
        });

        if (!existingFlower) {
          return res
            .status(404)
            .json({ message: "Flower not found or not owned by the vendor." });
        }

        await prisma.flower.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete flower." });
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
