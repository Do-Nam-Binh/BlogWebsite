import axios from "axios";
import API from "../../../../http-call/apiCall";

export const uploadImage = async ({ image }: { image: File }) => {
  try {
    // Get signed URL from backend
    const { data } = await API.get("/api/image/upload", {
      withCredentials: true,
    });

    const formData = new FormData();
    formData.append("file", image);
    formData.append("cloud_name", data.cloudName);
    formData.append("api_key", data.apiKey);
    formData.append("timestamp", data.timestamp);
    formData.append("signature", data.signature);

    // Upload image to Cloudinary
    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`,
      formData
    );

    return uploadRes.data.secure_url;

    // setImageUrl(uploadRes.data.secure_url);
    // alert("Image uploaded successfully!");
  } catch (error) {
    console.error("Upload error:", error);
  }
};
