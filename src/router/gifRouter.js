import { Router } from "express";
import { jwtCheckToken } from "../middleware/jwtCheckToken.js";
import { gifController } from "../controller/gifController.js";

export const gifRouter = Router();

gifRouter.post("/", jwtCheckToken, gifController.save)
gifRouter.get("/:userId", jwtCheckToken, gifController.getByUserId)
gifRouter.patch("/:gifId", jwtCheckToken, gifController.editById)
gifRouter.delete("/:gifId", jwtCheckToken, gifController.deleteById)
gifRouter.get("/search/user/:query", jwtCheckToken, gifController.searchUserByName)

gifRouter.get("/", gifController.getAll)
gifRouter.get("/search/all/:query", gifController.searchAllByName)
gifRouter.get("/search/users/:query", gifController.searchUsersByName)
