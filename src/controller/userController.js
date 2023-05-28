import bcrypt from "bcrypt"
import { logger } from "../configuration/logger/winston.js";
import { userRepository } from "../repository/userRepository.js"
import { jwtGenerateToken } from "../middleware/jwtGenerateToken.js"
import dotenv from "dotenv"
dotenv.config()

export const userController = {

  save: async (req, res) => {

    const form = req.body

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

  authenticateGoogle: async (req, res) => {
    const googleUser = req.body;
    const user = {
      userName: googleUser.firstName,
      email: googleUser.email,
      role: "U",
    }

    const currentUser = await userRepository.getByEmail(user.email)
  console.log(currentUser)
    if (typeof currentUser === "undefined") {
      const userGoogle = await userRepository.save(user);

      if (userGoogle) {
        const token = await jwtGenerateToken(userGoogle.id);
        if (token) return res.status(201).send({ token, userGoogle })
      } else {
        return res.status(500).send("Filed");
      }
    } else {
      const token = await jwtGenerateToken(currentUser.id);
      if (token) return res.status(201).send({ token, userGoogle: currentUser })
    }
  },

  autenticate: async (req, res) => {
    const data = req.body

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
              id: userFound._id,
              userName: userFound.userName,
              email: userFound.email,
              role: userFound.role
            }
          })
        }
        else {
          logger.error(`Authentication ${user.email} failed: Bad Crendentials!`)
          res.status(401).send()
        }
      })
  },

  validate: async (req, res) => {
    const user = res.locals.user;
    console.log(user)
    if (typeof user?.password === 'undefined') {
      const currentUser = await userRepository.getById(user.id);

      const userToSend = {
        id: currentUser.id,
        userName: currentUser.userName,
        email: currentUser.email,
        role: currentUser.role,
      }
      if (userToSend) return res.status(200).send(userToSend);
      return res.status(500).send("Something went wrong");
    }

    const currentUser = await userRepository.getById(user.id)
    const userToSend = {
      id: currentUser.id,
      userName: currentUser.userName,
      email: currentUser.email,
      role: currentUser.role,
    }

    return res.status(userToSend ? 200 : 500).send(userToSend);
  }
}