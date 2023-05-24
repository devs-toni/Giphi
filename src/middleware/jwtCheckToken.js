import jwt from "jsonwebtoken"
import { logger } from "../configuration/logger/winston"
//import { UserModel } from "../repository/schemas/User";
//import { UserGoogleModel } from "../repository/schemas/UserGoogle";

export const jwtCheckToken = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return res.status(498).send('Access Denied')

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(id)

    if (user) {
      res.locals.user = user
      next()
    } else {
      //const userGoogle = await UserGoogleModel.findById(id)
      //res.locals.user = userGoogle
      next()
    }

  } catch (e) {
    logger.error(e);
    res.status(498).send('Access Denied')
  }
}