import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error in Cloudinary:", error);
    throw error;
  }
};
