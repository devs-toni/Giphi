import { Router } from "express";
import { userController } from "../controller/userController.js";
import { jwtCheckToken } from "../middleware/jwtCheckToken.js";

export const userRouter = Router();

userRouter.post("/", userController.save)
userRouter.post("/auth", userController.autenticate)
userRouter.post("/authgoogle", userController.authenticateGoogle)

userRouter.get("/validate", jwtCheckToken, userController.validate)