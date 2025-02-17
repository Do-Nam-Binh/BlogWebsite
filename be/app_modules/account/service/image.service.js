import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

export const uploadImageService = () => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET
    );

    const cloudinary_name = process.env.CLOUDINARY_CLOUD_NAME;
    const api_key = process.env.CLOUDINARY_API_KEY;

    return { timestamp, signature, cloudinary_name, api_key };
  } catch (error) {
    return error;
  }
};
