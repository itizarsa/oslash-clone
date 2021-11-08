/**
 * Required External Modules and Interfaces
 */

import expressAsyncHandler from "express-async-handler"
import express, { Request, Response } from "express"
import { validationHandler } from "../middleware/validation.middleware"
import * as AuthService from "./auth.service"
import { LoginDto } from "./login.dto"

/**
 * Router Definition
 */

export const authRouter = express.Router()

/**
 * Controller Definitions
 */

// POST auth/login

authRouter.post(
	"/login",
	validationHandler(LoginDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await AuthService.login(req.body)

		res.status(200).send(response)
	})
)

// GET auth/logout

authRouter.get(
	"/logout",
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await AuthService.logout(res.locals.user)

		res.status(200).send(response)
	})
)
