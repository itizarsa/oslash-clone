/**
 * Required External Modules and Interfaces
 */

import expressAsyncHandler from "express-async-handler"
import express, { Request, Response } from "express"
import { validationHandler } from "../middleware/validation.middleware"
import * as ShortcutsService from "./shortcuts.service"
import { ShortcutDto } from "./create-shortcut.dto"

/**
 * Router Definition
 */

export const shortcutsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET: List all Shortcuts

shortcutsRouter.get(
	"/",
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await ShortcutsService.findAll()

		res.status(200).send(response)
	})
)

// POST: Create Shortcut

shortcutsRouter.post(
	"/",
	validationHandler(ShortcutDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await ShortcutsService.create(req.body)

		res.status(200).send(response)
	})
)
