import { Router } from "express";
import { jwtCheckToken } from "../middleware/jwtCheckToken.js";
import { gifController } from "../controller/gifController.js";

export const gifRouter = Router();

gifRouter.post("/", jwtCheckToken, gifController.save)
gifRouter.get("/:userId", jwtCheckToken, gifController.getByUserId)

gifRouter.get("/", gifController.getAll)
