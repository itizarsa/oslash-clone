import { Request, Response, NextFunction } from "express"
import HttpException from "../common/http-exception"

export const errorHandler = (
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { statusCode: status = 500, message = "Something went wrong" } = error

	response.status(status).json({ message })
}
