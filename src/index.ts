/**
 * Required External Modules
 */

import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import chalk from "chalk"
import cors from "cors"

import { errorHandler } from "./middleware/error.middleware"
import { notFoundHandler } from "./middleware/not-found.middleware"
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

app.use(errorHandler)
app.use(notFoundHandler)

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`${bold(green("✓"))} ${bold(cyan(`Listening on  port ${PORT} | ${ENV} mode.`))}`)
})
