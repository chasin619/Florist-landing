import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { runCors } from "@/utils/middleware/cors";
import prisma from "@/utils/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method === "POST") {
    const { business_email, password } = req.body;

    const user = await prisma.vendorUser.findUnique({
      where: { business_email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, business_email: user.business_email },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({ user, token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
