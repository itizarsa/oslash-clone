/**
 * Data Model Interfaces
 */

import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import HttpException from "../common/http-exception"
import * as UserService from "../users/users.service"
import TokenModel, { Token } from "./token.model"
import { asyncWrapper } from "../common/util"
import { Login } from "./auth.interface"
import { LoginDto } from "./login.dto"

/**
 * Service Methods
 */

export const login = async (body: LoginDto): Promise<Login> => {
	const { email, password } = body

	const user = await UserService.find({ email })

	const [bcryptErr, bcryptResult] = await asyncWrapper(bcrypt.compare(password, user.password))

	if (bcryptErr) {
		const { message } = bcryptErr

		throw new HttpException(500, message, bcryptErr)
	}

	if (!bcryptResult) throw new HttpException(401, "Wrong Password")

	const payload = { userId: user.id }

	const jwtSecret = process.env.JWT_SECRET as string

	const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" })

	const saveTokenReq = new TokenModel({ userId: user.id, token: accessToken }).save()

	const [saveTokenErr] = await asyncWrapper(saveTokenReq)

	if (saveTokenErr) {
		const { message } = saveTokenErr

		throw new HttpException(500, message, saveTokenErr)
	}

	return { accessToken, expiresIn: 3600 }
}

export const logout = async (token: Token) => {
	const deleteTokenReq = TokenModel.deleteOne({ userId: token.userId, token: token.token }).exec()

	const [deleteTokenErr] = await asyncWrapper(deleteTokenReq)

	if (deleteTokenErr) {
		const { message } = deleteTokenErr

		throw new HttpException(500, message, deleteTokenErr)
	}

	return { message: "Logout Successful" }
}
