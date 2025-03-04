import { NextApiRequest, NextApiResponse } from "next";
import { uploadImageToS3 } from "@/utils/s3";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { base64Image, folder = "Inspirations" } = req.body;

    if (!base64Image.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const base64Content = base64Image.split(",")[1];
    const filename = `image-${Date.now()}.jpeg`;
    const imageUrl = await uploadImageToS3(
      base64Content,
      filename,
      folder,
      "image/jpeg"
    );

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({ message: "Failed to upload image", error });
  }
}
