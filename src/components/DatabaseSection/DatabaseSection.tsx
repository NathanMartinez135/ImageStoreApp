import { Button, TextField } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import "./DatabaseSection.scss";
import { ImageResponseData } from "../../services/image.service";
import { formatFileSize } from "../../utils/utils";
import { ChangeEvent, useState } from "react";

interface DatabaseSectionProps {
  images: ImageResponseData[];
  onDelete: (id: number) => void;
  onPreview: (image: ImageResponseData) => void;
}

const DatabaseSection = ({
  images,
  onDelete,
  onPreview,
}: DatabaseSectionProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchText(event.target.value);
  };

  return (
    <div className="database-section">
      <h2 className="section-title">Saved Images ({images.length})</h2>

      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        onChange={handleSearchTextChange}
      />
      {images.length === 0 ? (
        <p className="empty-state">
          No images saved yet. Upload and save some images to see them here!
        </p>
      ) : (
        <div className="image-grid">
          {images
            .filter((image) =>
              image.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((image: ImageResponseData) => (
              <div key={image.id} className="image-card">
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="card-image"
                  onClick={() => onPreview(image)}
                />
                <div className="card-content">
                  <h3 className="card-title">{image.name}</h3>
                  <p className="card-date">{image.uploadDate}</p>
                  <p className="card-size">{formatFileSize(image.size)}</p>

                  {image.tags.length > 0 && (
                    <div className="tags-container">
                      {image.tags.map((tag: string, index: number) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="card-actions">
                    <Button
                      onClick={() => onPreview(image)}
                      startIcon={<Visibility />}
                      variant="outlined"
                      size="small"
                      className="view-button"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => onDelete(image.id)}
                      startIcon={<Delete />}
                      variant="outlined"
                      color="error"
                      size="small"
                      className="delete-button"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DatabaseSection;
