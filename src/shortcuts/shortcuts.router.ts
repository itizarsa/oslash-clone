/**
 * Required External Modules and Interfaces
 */

import expressAsyncHandler from "express-async-handler"
import express, { Request, Response } from "express"
import { validationHandler } from "../middleware/validation.middleware"
import { CreateShortcutDto } from "./create-shortcut.dto"
import { SearchShortcutDto } from "./search-shortcut.dto"
import * as ShortcutsService from "./shortcuts.service"

/**
 * Router Definition
 */

export const shortcutsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET shortcuts

shortcutsRouter.get(
	"/",
	expressAsyncHandler(async (req: Request, res: Response) => {
		const { userId } = res.locals.user

		const response = await ShortcutsService.findAll(userId)

		res.status(200).send(response)
	})
)

// POST shortcuts/search

shortcutsRouter.post(
	"/search",
	validationHandler(SearchShortcutDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const { userId } = res.locals.user

		const response = await ShortcutsService.search(req.body, userId)

		res.status(200).send(response)
	})
)

// POST shortcuts

shortcutsRouter.post(
	"/",
	validationHandler(CreateShortcutDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const { userId } = res.locals.user

		const response = await ShortcutsService.create(req.body, userId)

		res.status(200).send(response)
	})
)

// DELETE shortcuts/:id

shortcutsRouter.delete(
	"/:id",
	expressAsyncHandler(async (req: Request, res: Response) => {
		const { userId } = res.locals.user

		const response = await ShortcutsService.remove(req.params.id, userId)

		res.status(204).send(response)
	})
)
