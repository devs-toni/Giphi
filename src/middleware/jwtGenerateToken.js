import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

export const jwtGenerateToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }, (e, token) => {
      e ? reject(e) : resolve(token)
    })
  })
}