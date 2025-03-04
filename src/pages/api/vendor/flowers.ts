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
        const {
          page = 1,
          pageSize = 10,
          search = "",
          category = "",
        } = req.query as {
          page?: string;
          pageSize?: string;
          search?: string;
          category?: string;
        };
        const skip = (Number(page) - 1) * Number(pageSize);
        const take = Number(pageSize);

        // Build the filter conditions
        const baseConditions: any = {
          OR: [{ userId: vendor.id }, { isShared: true }],
        };

        if (search) {
          baseConditions.name = {
            contains: search,
            mode: "insensitive",
          };
        }

        if (category) {
          baseConditions.flowerCategoryId = Number(category);
        }

        let flowers;
        let totalFlowers;

        if (search || category) {
          flowers = await prisma.flower.findMany({
            where: baseConditions,
            orderBy: { createdAt: "desc" },
          });
          totalFlowers = flowers.length;
        } else {
          flowers = await prisma.flower.findMany({
            where: baseConditions,
            skip,
            take,
            orderBy: { createdAt: "desc" },
          });
          totalFlowers = await prisma.flower.count({
            where: baseConditions,
          });
        }

        const totalPages = Math.ceil(totalFlowers / Number(pageSize));

        return res.status(200).json({
          data: flowers,
          pagination: {
            total: totalFlowers,
            totalPages,
            currentPage: Number(page),
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch flowers." });
      }

    case "POST":
      const {
        name,
        stemsPerBunch,
        costPerStem,
        costPerBunch,
        supplier,
        isShared,
      } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ message: "The 'name' field is required." });
      }
      if (!req.body.colorId) {
        return res
          .status(400)
          .json({ message: "The 'colorId' field is required." });
      }
      if (!stemsPerBunch) {
        return res
          .status(400)
          .json({ message: "The 'stemsPerBunch' field is required." });
      }
      if (!costPerStem) {
        return res
          .status(400)
          .json({ message: "The 'costPerStem' field is required." });
      }
      if (!costPerBunch) {
        return res
          .status(400)
          .json({ message: "The 'costPerBunch' field is required." });
      }
      if (!req.body.imageData) {
        return res
          .status(400)
          .json({ message: "The 'imageData' field is required." });
      }

      try {
        const imageFilename = `${Date.now()}_${name.replace(/\s+/g, "_")}.jpg`;
        const imageUrl = await uploadImageToS3(
          req.body.imageData,
          imageFilename,
          "Flowers",
          "image/jpeg"
        );

        const newFlower = await prisma.flower.create({
          data: {
            name,
            colorId: req.body.colorId,
            stemsPerBunch,
            costPerStem,
            costPerBunch,
            supplier,
            imageFilename: imageUrl,
            userId: vendor.id,
            flowerCategoryId: req.body.flowerCategoryId,
            isShared,
          },
        });
        return res.status(201).json(newFlower);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
      }
    case "PUT":
      const { id, colorId, flowerCategoryId, imageData, userId, ...data } =
        req.body;
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

        let imageFilename = existingFlower.imageFilename;
        if (imageData) {
          imageFilename = `${Date.now()}_${existingFlower.name.replace(
            /\s+/g,
            "_"
          )}.jpg`;

          const imageUrl = await uploadImageToS3(
            imageData,
            imageFilename,
            "Flowers",
            "image/jpeg"
          );

          imageFilename = imageUrl;
        }

        const updateData = {
          ...data,
          imageFilename,
          ...(colorId && { colorId }),
          ...(flowerCategoryId && { flowerCategoryId }),
        };

        const updatedFlower = await prisma.flower.update({
          where: { id },
          data: updateData,
        });

        return res.status(200).json(updatedFlower);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update flower." });
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
