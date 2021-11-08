/**
 * Required External Modules and Interfaces
 */

import * as ShortcutsService from "./shortcuts.service"
import express, { Request, Response } from "express"
import HttpException from "../common/http-exception"
import { asyncWrapper } from "../common/util"

/**
 * Router Definition
 */

export const shortcutsRouter = express.Router()

/**
 * Controller Definitions
 */

// List all Shortcuts

shortcutsRouter.get("/", async (req: Request, res: Response) => {
	const [shortcutErr, shortcutRes] = await asyncWrapper(ShortcutsService.findAll())

	if (shortcutErr) {
		const { message } = shortcutErr

		throw new HttpException(500, message, shortcutErr)
	}

	res.status(200).send(shortcutRes)
})
