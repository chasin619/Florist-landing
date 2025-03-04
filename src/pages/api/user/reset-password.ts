import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { runCors } from "@/utils/middleware/cors";
import prisma from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { password, token } = req.body;

  if (!password || !token) {
    return res.status(400).json({ message: "Password and token are required" });
  }

  try {
    const user = await prisma.vendorUser.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.vendorUser.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({
      message: "Error resetting password",
    });
  }
}
