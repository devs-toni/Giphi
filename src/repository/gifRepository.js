import { logger } from "../configuration/logger/winston.js";
import { gifModel } from "./schema/Gif.js";

export const gifRepository = {

  save: async (gif, userId) => {
    const gifExists = await gifModel.findOne({ title: gif.title, userId });

    if (!gifExists) {
      const savedGif = await gifModel.create(gif)
      return savedGif
    }
    logger.error(`Gif ${gif.title} already exists`)
    return undefined
  },

  getAll: async () => gifModel.find({}),

  getByUserId: async (userId) => gifModel.find({ userId }),

  editById: async (_id, gif) => gifModel.updateOne({ _id }, { $set: { title: gif.title } }),

  searchAllByName: async (name) => gifModel.find({ title: { $regex: name, $options: "i" } }),

  searchUserByName: async (name, userId) => gifModel.find({ title: { $regex: name, $options: "i" }, userId }),

  searchUsersByName: async (name) => gifModel.find({ title: { $regex: name, $options: "i" }, userId: { $exists : true } }),

  deleteById: async (_id) => gifModel.deleteOne({ _id }),

}