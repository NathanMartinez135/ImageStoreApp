import { useState } from "react";
import "./App.scss";
import DatabaseSection from "./components/DatabaseSection/DatabaseSection";
import ImagePreviewModal from "./components/ImagePreviewModal/ImagePreviewModal";
import UploadSection from "./components/UploadSection/UploadSection";
import {
  deleteImageFromApi,
  ImageResponseData,
  saveImageToApi,
} from "./services/image.service";
import { Dialog } from "@mui/material";

function App() {
  const [images, setImages] = useState<ImageResponseData[]>([]);
  const [previewImage, setPreviewImage] = useState<ImageResponseData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addImage = (
    imageData: Omit<ImageResponseData, "id" | "uploadDate">
  ): void => {
    setIsLoading(true);
    saveImageToApi(imageData)
      .then((newImage) => {
        setImages((prevImages) => [...prevImages, newImage]);
      })
      .catch((error: Error) => {
        console.error("Error saving image:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteImage = (id: number): void => {
    setIsLoading(true);
    deleteImageFromApi(id)
      .then(() => {
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
        if (previewImage && previewImage.id === id) {
          setPreviewImage(null);
        }
      })
      .catch(() => {
        console.error("Error deleting image");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openPreview = (image: ImageResponseData): void => {
    setPreviewImage(image);
  };

  const closePreview = (): void => {
    setPreviewImage(null);
  };

  // its important to seperate concerns, so we have different components for uploading, viewing the database, and previewing an image
  return (
    <div className="image-database-app">
      <div className="app-container">
        <h1 className="app-title">Image Database App</h1>
        {isLoading && (
          <progress hidden={!isLoading} className="loader"></progress>
        )}
        <UploadSection onImageSave={addImage} />

        <DatabaseSection
          images={images}
          onDelete={deleteImage}
          onPreview={openPreview}
        />

        {previewImage && (
          <Dialog open={true} onClose={closePreview} maxWidth="md" fullWidth>
            <ImagePreviewModal image={previewImage} onClose={closePreview} />
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default App;
