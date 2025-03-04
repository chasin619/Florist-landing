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
  folder: string,
  contentType: string = "image/png",
  bucketName: string = process.env.AWS_S3_BUCKET_NAME!
): Promise<string> => {
  if (!bucketName) {
    throw new Error("S3 bucket name is not configured.");
  }

  try {
    const base64Data = imageData.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );

    if (!base64Data) {
      throw new Error("Invalid base64 data: Empty or malformed data URL.");
    }

    const imageBuffer = Buffer.from(base64Data, "base64");

    if (imageBuffer.length === 0) {
      throw new Error("Decoded image buffer is empty.");
    }

    const optimizedBuffer = await sharp(imageBuffer).png().toBuffer();

    const uploadParams = {
      Bucket: bucketName,
      Key: `${folder}/${filename}`,
      Body: optimizedBuffer,
      ContentType: contentType, // Use the provided content type
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error("Failed to upload image to S3:", error);
    throw error; // Re-throw the error
  }
};

export default s3;
