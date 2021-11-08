/**
 * Required External Modules
 */

import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import chalk from "chalk"
import "reflect-metadata"
import cors from "cors"
import { checkAccessToken } from "./middleware/access-token.middleware"
import { notFoundHandler } from "./middleware/not-found.middleware"
import { shortcutsRouter } from "./shortcuts/shortcuts.router"
import { errorHandler } from "./middleware/error.middleware"
import { authRouter } from "./auth/auth.router"
import connectDb from "./common/db"

dotenv.config()

connectDb()

/**
 * App Variables
 */

if (!process.env.PORT) process.exit(1)

const PORT: number = parseInt(process.env.PORT as string, 10)

const ENV = process.env.NODE_ENV

const app = express()

const { green, bold, cyan } = chalk

/**
 *  App Configuration
 */

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(checkAccessToken)

app.use("/api/auth", authRouter)
app.use("/api/shortcuts", shortcutsRouter)

app.use(errorHandler)
app.use(notFoundHandler)

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`${bold(green("✓"))} ${bold(cyan(`Listening on  port ${PORT} | ${ENV} mode.`))}`)
})
