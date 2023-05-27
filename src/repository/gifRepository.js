import { logger } from "../configuration/logger/winston.js";
import { gifModel } from "./schema/Gif.js";

export const gifRepository = {

  save: async (gif) => {
    const gifExists = await gifModel.findOne({ title: gif.title });
    console.log(gifExists)
    if (!gifExists) {
      const savedGif = await gifModel.create(gif)
      return savedGif
    }
    logger.error(`Gif ${gif.title} already exists`)
    return undefined
  },

  getAll: async () => gifModel.find({}),

  getByUserId: async (userId) => gifModel.find({ userId })
}