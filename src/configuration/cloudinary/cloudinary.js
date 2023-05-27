import configuration from "../configuration.js"
import pkg from "cloudinary"

const cloudinary = pkg.v2
const { cloudinary: cloudinaryConfig } = configuration

cloudinary.config({
  cloud_name: cloudinaryConfig.NAME,
  api_key: cloudinaryConfig.KEY,
  api_secret: cloudinaryConfig.SECRET,
});

export const uploadGif = async (gifPath) => {
  const gifUploaded = await cloudinary.uploader.upload(gifPath, {
    resource_type: "image",
    folder: "gifs/",
  })
  return gifUploaded
}
