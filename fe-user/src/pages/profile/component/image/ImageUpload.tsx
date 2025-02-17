import { useState } from "react";
import { uploadImage } from "./uploadImage";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    try {
      console.log("Uploading Image:", image); // Debugging log
      const uploadedUrl = await uploadImage({ image });

      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
