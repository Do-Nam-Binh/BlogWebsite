import React, { useState, useRef, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { uploadImage } from "./uploadImage";

const ImageUpload: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setCroppedImage(imageDataUrl);
    }
  };

  const handleCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) {
      return;
    }
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        const croppedFile = new File([croppedBlob], "croppedImage.jpeg", {
          type: "image/jpeg",
        });
        setCroppedImage(URL.createObjectURL(croppedFile));
        setCroppedFile(croppedFile);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleImageUpload = async () => {
    if (!croppedFile) {
      alert("Please crop the image first!");
      return;
    }

    setLoading(true);

    try {
      const response = await uploadImage({ image: croppedFile });
      if (response.status === 200) {
        console.log("Image uploaded");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
      {croppedImage && (
        <>
          <div className="mt-4 flex flex-col items-center">
            <p>Preview:</p>
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
            />
          </div>
          <button
            onClick={handleImageUpload}
            disabled={loading}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
          <button
            onClick={handleCrop}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded mb-6"
          >
            Crop Image
          </button>
        </>
      )}
      {imageSrc ? (
        <>
          <div className="relative w-[600px] h-[600px] bg-[#333]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Choose Image
        </button>
      )}
    </div>
  );
};

export default ImageUpload;

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("File reading failed"));
      }
    });
    reader.readAsDataURL(file);
  });
};
