import { Response, Request, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { asyncWrapper } from "../common/util"

const verifyJwt = (token: string) => {
	return new Promise((resolve, reject) => {
		const jwtSecret = process.env.JWT_SECRET as string

		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) return reject(err)

			return resolve(decoded)
		})
	})
}

export const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	if (req.path === "/api/auth/login") return next()

	const authHeader = req.headers["authorization"]

	if (!authHeader) return res.status(401).json({ message: "Access Token required" })

	const token = authHeader.split(" ")[1]

	const [err, payload] = await asyncWrapper(verifyJwt(token))

	if (err) return res.status(401).json({ message: "Invalid Access Token" })

	res.locals.user = { userId: payload.userId, token }

	next()
}
