import { Router } from "express";
import { userController } from "../controller/userController.js";

export const userRouter = Router();

userRouter.post("/", userController.save)
userRouter.post("/auth", userController.autenticate)