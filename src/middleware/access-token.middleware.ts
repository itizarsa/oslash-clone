import { Response, Request, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import { asyncWrapper } from "../common/util"
import TokenModel from "../auth/token.model"

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

	const [findTokenErr, findTokenRes] = await asyncWrapper(TokenModel.findOne({ token }).exec())

	if (findTokenErr) {
		const { message } = findTokenErr

		return res.status(500).json({ message })
	}

	if (!findTokenRes) return res.status(401).json({ message: "Invalid Access Token" })

	const [verifyJwtErr, payload] = await asyncWrapper(verifyJwt(token))

	if (verifyJwtErr) return res.status(401).json({ message: "Invalid Access Token" })

	res.locals.user = { userId: payload.userId, token }

	next()
}
