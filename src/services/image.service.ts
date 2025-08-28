// depending on how large the code base is, we might use different approaches to how we structure shared types
// for something this small, we can just keep it here
export interface ImageResponseData {
  id: number;
  name: string;
  dataUrl: string;
  size: number;
  type: string;
  tags: string[];
  uploadDate: string;
}

// We dont need the params but we are just simulating API calls.

export const saveImageToApi = async (
  imageData: any
): Promise<ImageResponseData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        ...imageData,
        uploadDate: new Date().toLocaleString(),
      });
    }, 1000);
  });
};

export const deleteImageFromApi = async (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
