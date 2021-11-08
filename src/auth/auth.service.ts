/**
 * Data Model Interfaces
 */

import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import HttpException from "../common/http-exception"
import * as UserService from "../users/users.service"
import { asyncWrapper } from "../common/util"
import { Login } from "./auth.interface"
import { LoginDto } from "./login.dto"

/**
 * Service Methods
 */

export const login = async (body: LoginDto): Promise<Login> => {
	const { email, password } = body

	const user = await UserService.find({ email })

	const [err, result] = await asyncWrapper(bcrypt.compare(password, user.password))

	if (err) {
		const { message } = err

		throw new HttpException(500, message, err)
	}

	if (!result) throw new HttpException(401, "Wrong Password")

	const payload = { userId: user.id }

	const jwtSecret = process.env.JWT_SECRET as string

	const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" })

	return { accessToken, expiresIn: 3600 }
}
