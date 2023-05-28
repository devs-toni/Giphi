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
    savedGif ? res.send(savedGif) : res.status(500).send("It Exists")
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
  },

  editById: async (req, res) => {
    const gifId = req.params.gifId
    const gifModifyData = req.body

    const updatedGif = await gifRepository.editById(gifId, gifModifyData)

    if (updatedGif.modifiedCount !== 0)
      logger.console(`Gif title ${gifId} modified properly`)
    else
      logger.console(`File does not exist`)

    return res.status(updatedGif.acknowledged ? 200 : 500).send(updatedGif.modifiedCount !== 0 ? "File updated" : "Failed");
  },

  searchAllByName: async (req, res) => {
    const searchQuery = req.params.query
    const searchValues = await gifRepository.searchAllByName(searchQuery)
    logger.console(`Searching all gifs properly`)
    return res.send(searchValues);
  },

  searchUserByName: async (req, res) => {
    const searchQuery = req.params.query
    const searchValues = await gifRepository.searchUserByName(searchQuery, res.locals.user.id)
    logger.console(`Searching user gifs properly`)
    return res.send(searchValues);
  },

  searchUsersByName: async (req, res) => {
    const searchQuery = req.params.query
    const searchValues = await gifRepository.searchUsersByName(searchQuery)
    logger.console(`Searching users gifs properly`)
    return res.send(searchValues);
  },

  deleteById: async (req, res) => {
    const gifId = req.params.gifId
    const deletedGif = await gifRepository.deleteById(gifId)
    console.log(deletedGif)
    if (deletedGif.deletedCount !== 0) {
      logger.console(`Gif ${gifId} deleted properly`)
    } else {
      logger.console(`Gif ${gifId} does not exit`)
    }
    return res.status(deletedGif.deletedCount !== 0 ? 200 : 500).send(deletedGif.deletedCount !== 0 ? "Deleted" : "File does not exist");
  }
}