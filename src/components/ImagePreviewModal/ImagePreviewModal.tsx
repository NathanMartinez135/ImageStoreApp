import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import "./ImagePreviewModal.scss";
import { ImageResponseData } from "../../services/image.service";
import { formatFileSize } from "../../utils/utils";

interface ImagePreviewModalProps {
  image: ImageResponseData;
  onClose: () => void;
}

const ImagePreviewModal = ({ image, onClose }: ImagePreviewModalProps) => {
  return (
    <>
      <DialogTitle>
        {image.name}
        <IconButton
          onClick={onClose}
          aria-label="Close preview"
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <img src={image.dataUrl} alt={image.name} className="modal-image" />
        <div className="modal-info">
          <div>
            <strong>Upload Date:</strong> {image.uploadDate}
          </div>
          <div>
            <strong>Size:</strong> {formatFileSize(image.size)}
          </div>
          <div>
            <strong>Type:</strong> {image.type}
          </div>
          {image.tags.length > 0 && (
            <div>
              <strong>Tags:</strong> {image.tags.join(", ")}
            </div>
          )}
        </div>
      </DialogContent>
    </>
  );
};

export default ImagePreviewModal;
