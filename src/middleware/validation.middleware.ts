import { Response, Request, NextFunction } from "express"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"

export const validationHandler = (dtoClass: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const output: any = plainToClass(dtoClass, req.body)

		validate(output, { skipMissingProperties: true }).then((errors) => {
			if (errors.length > 0) {
				const message = errors.map((error) => {
					const constraints = error.constraints ? error.constraints : {}

					return Object.values(constraints).join(".")
				})

				return res.status(400).json({ message })
			}

			res.locals.input = output

			return next()
		})
	}
}
