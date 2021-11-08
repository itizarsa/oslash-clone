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
		const response = await ShortcutsService.findAll()

		res.status(200).send(response)
	})
)

// POST shortcuts/search

shortcutsRouter.post(
	"/search",
	validationHandler(SearchShortcutDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await ShortcutsService.search(req.body)

		res.status(200).send(response)
	})
)

// POST shortcuts

shortcutsRouter.post(
	"/",
	validationHandler(CreateShortcutDto),
	expressAsyncHandler(async (req: Request, res: Response) => {
		const response = await ShortcutsService.create(req.body)

		res.status(200).send(response)
	})
)
