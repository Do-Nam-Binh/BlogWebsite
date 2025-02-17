import { uploadImageService } from "../service/image.service.js";
export const uploadImage = async (req, res) => {
  try {
    const { timestamp, signature, cloudinary_name, api_key } =
      uploadImageService();
    res.json({
      cloudName: cloudinary_name,
      apiKey: api_key,
      timestamp,
      signature,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate signature" });
  }
};
