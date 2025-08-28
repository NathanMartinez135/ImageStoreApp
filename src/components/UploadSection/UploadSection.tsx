import { useState, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import "./UploadSection.scss";
import { ImageResponseData } from "../../services/image.service";
import { formatFileSize } from "../../utils/utils";

interface SelectedImage {
  file: File;
  dataUrl: string;
  name: string;
  size: number;
  type: string;
}

interface UploadSectionProps {
  onImageSave: (
    imageData: Omit<ImageResponseData, "id" | "uploadDate"> // we dont have these properties yet.
  ) => void;
}

const UploadSection = ({ onImageSave }: UploadSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );
  const [imageName, setImageName] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setSelectedImage({
            file: file,
            dataUrl: result,
            name: file.name,
            size: file.size,
            type: file.type,
          });
          setImageName(file.name.split(".")[0]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImageToDatabase = (): void => {
    if (selectedImage) {
      onImageSave({
        name: imageName || selectedImage.name,
        dataUrl: selectedImage.dataUrl,
        size: selectedImage.size,
        type: selectedImage.type,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      });

      setSelectedImage(null);
      setImageName("");
      setTags("");
    }
  };

  const handleImageNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setImageName(event.target.value);
  };

  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTags(event.target.value);
  };

  return (
    <div className="upload-section">
      <h2 className="section-title">Upload New Image</h2>

      <div className="upload-content">
        <div className="file-upload-area">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Select Image File
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
        </div>

        {selectedImage && (
          <div className="preview-section">
            <div className="preview-image">
              <img
                src={selectedImage.dataUrl}
                alt="Preview"
                className="image-preview"
              />
              <p className="image-info">
                Size: {formatFileSize(selectedImage.size)} | Type:{" "}
                {selectedImage.type}
              </p>
            </div>

            <div className="form-section">
              <div className="form-group">
                <TextField
                  label="Image Name"
                  fullWidth
                  value={imageName}
                  onChange={handleImageNameChange}
                  placeholder="Enter image name"
                  size="small"
                />
              </div>

              <div className="form-group">
                <TextField
                  label="Tags (comma-separated)"
                  fullWidth
                  value={tags}
                  onChange={handleTagsChange}
                  placeholder="nature, landscape, gif"
                  size="small"
                />
              </div>

              <Button
                variant="contained"
                onClick={saveImageToDatabase}
                className="save-button"
              >
                Save to Database
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
