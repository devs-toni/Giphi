import { logger } from "../configuration/logger/winston.js";
import  { userModel } from "./schema/User.js"

export const userRepository = {

  save: async (user) => {
    try {

      const userExist = await userModel.findOne({ email: user.email })
      //const userGoogleExist = await UserGoogleModel.findOne({ email: user.email });
  
      !userExist && await userModel.create(user)
      return 201;

    } catch (e) {
      logger.error(e.message);
      return 500;
    }
  },

  getByEmail: async (email) => {
    try {
      const userFound = await userModel.findOne({ email });
      return userFound || undefined

    } catch (e) {
      logger.error(e.message)
      return undefined;
    }
  },
}