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
        const eventTypes = await prisma.eventType.findMany({
          where: {
            OR: [{ vendorId: vendor.id }, { isShared: true }],
          },
        });
        return res.status(200).json(eventTypes);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to fetch event types." });
      }

    case "POST":
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required." });
      }

      try {
        const newEventType = await prisma.eventType.create({
          data: {
            name,
            vendorId: vendor.id,
          },
        });
        return res.status(201).json(newEventType);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create a new event type." });
      }

    case "PUT":
      const { id, ...data } = req.body;
      if (!id || (data.name && typeof data.name !== "string")) {
        return res
          .status(400)
          .json({ message: "ID and valid name are required." });
      }

      try {
        const updatedEventType = await prisma.eventType.update({
          where: { id },
          data: {
            ...data,
            vendorId: vendor.id,
          },
        });
        return res.status(200).json(updatedEventType);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to update event type." });
      }

    case "DELETE":
      const { deleteId } = req.body;
      if (!deleteId) {
        return res.status(400).json({ message: "Delete ID is required." });
      }

      try {
        await prisma.eventType.delete({
          where: { id: deleteId },
        });
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to delete event type." });
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
