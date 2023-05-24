import bcrypt from "bcrypt"
import { logger } from "../configuration/logger/winston.js";
import { userRepository } from "../repository/userRepository.js"
import { jwtGenerateToken } from "../middleware/jwtGenerateToken.js"

export const userController = {

  save: async (req, res) => {

    const form = req.body.form

    bcrypt.hash(form.password, 10, (e, hash) => {
      if (e) {
        logger.error(`Register ${form.userName} failed.`)
        res.status(500).send()
      }
      const user = {
        userName: form.userName,
        email: form.email,
        password: hash,
        role: "U",
      }

      userRepository.save(user)
        .then((code) => {
          logger.console(`${user.userName} saved successfully.`)
          return res.status(code).send(code === 201 ? { userName: user.userName, email: user.email } : {})
        })
        .catch((e) => {
          logger.error(`Register ${form.userName} failed: ${e.message}`)
          return res.status(500).send()
        })
    })
  },

  autenticate: async (req, res) => {
    const data = req.body.user

    const user = {
      email: data.email,
      password: data.password,
    }

    const userFound = await userRepository.getByEmail(user.email)

    if (typeof userFound === "undefined") {
      logger.error(`Authentication ${user.email} failed: Bad Crendentials!`)
      return res.status(401).send()
    }

    const token = await jwtGenerateToken(userFound.id)

    bcrypt.compare(
      user.password,
      userFound.password,
      (e, result) => {
        if (e) {
          logger.error(`Authentication ${user.email} failed: ${e.message}`)
          res.status(500).send()
        }

        if (result) {
          logger.console(`Authentication ${user.email} success!`)
          res.status(200).send({
            token, user: {
              userName: userFound.userName,
              email: userFound.email
            }
          })
        }
        else {
          logger.error(`Authentication ${user.email} failed: Bad Crendentials!`)
          res.status(401).send()
        }
      })
  },
}