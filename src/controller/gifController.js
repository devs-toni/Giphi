import { logger } from "../configuration/logger/winston.js";
import dotenv from "dotenv"
import { gifRepository } from "../repository/gifRepository.js";
import { uploadGif } from "../configuration/cloudinary/cloudinary.js";
dotenv.config()

export const gifController = {

  save: async (req, res) => {
    const gifUploaded = await uploadGif(req.files.gif.tempFilePath)
      .then((res) => {
        logger.console(`Gif ${req.files.gif.name} uploaded`)
        return res;
      })
      .catch((e) => {
        logger.error(e.message)
        return undefined;
      })


    if (typeof gifUploaded === "undefined") res.status(500).send()

    const savedGif = await gifRepository.save({
      title: req.files.gif.name,
      type: req.files.gif.mimetype,
      gif: gifUploaded.url,
      userId: res.locals.user._id
    })
    savedGif && logger.console(`Gif ${req.files.gif.title} already exists`)
    savedGif ? res.send(savedGif) : res.status(500).send()
  },

  getAll: async (req, res) => {
    const allGifs = await gifRepository.getAll()
    logger.console("All gifs obtained")
    return res.send(allGifs)
  },

  getByUserId: async (req, res) => {
    const userId = req.params.userId
    const allUserGifs = await gifRepository.getByUserId(userId)
    logger.console("All user uploaded gifs obtained")
    return res.send(allUserGifs)
  }
}