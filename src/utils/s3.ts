import AWS from "aws-sdk";
import sharp from "sharp";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Uploads an image to S3 after reducing its size using sharp.
 *
 * @param imageData - Base64-encoded image data.
 * @param filename - Desired file name for the image in S3.
 * @param folder - Folder name in the S3 bucket (e.g., 'arrangements', 'Flowers').
 * @param contentType - MIME type of the image (e.g., 'image/jpeg', 'image/png').
 * @param bucketName - S3 bucket name (defaults to environment variable).
 * @returns URL of the uploaded image.
 */
export const uploadImageToS3 = async (
  imageData: string,
  filename: string,
  folder:
    | "arrangements"
    | "Flowers"
    | "Inspirations"
    | "backgroundImages"
    | "HeroImages"
    | "Signatures",
  contentType: string = "image/jpeg", // Default content type
  bucketName: string = process.env.AWS_S3_BUCKET_NAME!
): Promise<string> => {
  if (!bucketName) {
    throw new Error("S3 bucket name is not configured.");
  }

  try {
    // Decode the base64 image
    const imageBuffer = Buffer.from(imageData, "base64");

    // Optimize the image using sharp
    const optimizedBuffer = await sharp(imageBuffer)
      .resize({ width: 800 }) // Resize to a max width (adjust as needed)
      .jpeg({ quality: 80 }) // Adjust quality (lower value = more compression)
      .toBuffer();

    // Prepare upload parameters
    const uploadParams = {
      Bucket: bucketName,
      Key: `${folder}/${filename}`, // Include the folder in the Key
      Body: optimizedBuffer,
      ContentType: contentType, // Set content type
    };

    // Upload the optimized image to S3
    const uploadResult = await s3.upload(uploadParams).promise();

    return uploadResult.Location;
  } catch (error) {
    console.error("Failed to upload image to S3:", error);
    throw new Error("Image upload failed.");
  }
};

export default s3;
