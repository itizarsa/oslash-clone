import { Schema, model, connect } from "mongoose"
import chalk from "chalk"

const { red, green, magenta, bold } = chalk

const connectDb = () => {
	const URI = process.env.MONGO_URI as string

	connect(URI)
		.then(() => {
			console.log(`${bold(green("✓"))}  ${bold(magenta(`MongoDB Connection Established.`))}`)
		})
		.catch((err) => {
			console.error(err)

			console.log(
				`${bold(red("✗"))} MongoDB connection error. Please make sure MongoDB is running.`
			)

			process.exit(1)
		})
}

export default connectDb
