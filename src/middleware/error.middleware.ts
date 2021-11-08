import { Request, Response, NextFunction } from "express"
import HttpException from "../common/http-exception"

export const errorHandler = (
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const status = error.statusCode || 500

	response.status(status).send(error)
}
