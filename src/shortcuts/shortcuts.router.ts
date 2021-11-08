/**
 * Required External Modules and Interfaces
 */

import * as ShortcutsService from "./shortcuts.service"
import express, { Request, Response } from "express"
import HttpException from "../common/http-exception"
import { asyncWrapper } from "../common/util"
import { validationHandler } from "../middleware/validation.middleware"
import { ShortcutDto } from "./create-shortcut.dto"

/**
 * Router Definition
 */

export const shortcutsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET: List all Shortcuts
shortcutsRouter.get("/", async (req: Request, res: Response) => {
	const [shortcutErr, shortcutRes] = await asyncWrapper(ShortcutsService.findAll())

	if (shortcutErr) {
		const { message } = shortcutErr

		throw new HttpException(500, message, shortcutErr)
	}

	res.status(200).send(shortcutRes)
})

// POST: Create Shortcut
shortcutsRouter.post("/", validationHandler(ShortcutDto), async (req: Request, res: Response) => {
	const [shortcutErr, shortcutRes] = await asyncWrapper(ShortcutsService.create(req.body))

	if (shortcutErr) {
		const { message } = shortcutErr

		throw new HttpException(500, message, shortcutErr)
	}

	res.status(200).send(shortcutRes)
})
