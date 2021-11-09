/**
 * Required External Modules and Interfaces
 */

import expressAsyncHandler from "express-async-handler"
import express, { Request, Response } from "express"
import { validationHandler } from "../middleware/validation.middleware"
import { CreateUserDto } from "./create-user.dto"
import * as UserService from "./users.service"

/**
 * Router Definition
 */

export const userRouter = express.Router()

/**
 * Controller Definitions
 */

// POST users

userRouter.post(
	"/",
	validationHandler(CreateUserDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await UserService.create(req.body as CreateUserDto)

		res.status(200).send(response)
	})
)
