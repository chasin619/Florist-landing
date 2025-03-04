import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { runCors } from "@/utils/middleware/cors";
import { sendEmail } from "@/utils/emailHelpers";
import prisma from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { business_email } = req.body;

  if (!business_email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await prisma.vendorUser.findUnique({
      where: { business_email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await prisma.vendorUser.update({
      where: { business_email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetUrl = `https://www.wpro.ai/reset-password?token=${resetToken}`;

    sendEmail(
      business_email,
      "Password Reset Request",
      `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `
    );

    return res.status(200).json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({
      message: "Error sending password reset email",
    });
  }
}
