/**
 * Data Model Interfaces
 */

import bcrypt from "bcrypt"
import HttpException from "../common/http-exception"
import { CreateUserDto } from "./create-user.dto"
import { FindUserQuery } from "./user.interface"
import UserModel, { User } from "./user.model"
import { asyncWrapper } from "../common/util"

/**
 * Service Methods
 */

export const find = async (query: FindUserQuery): Promise<User> => {
	const [err, res] = await asyncWrapper(UserModel.findOne(query).exec())

	if (err) {
		const { message } = err

		throw new HttpException(500, message, err)
	}

	if (!res) throw new HttpException(404, "User Not Found")

	return res
}

export const create = async (body: CreateUserDto): Promise<User> => {
	const { password, name, email } = body

	const [hashErr, hash] = await asyncWrapper(bcrypt.hash(password, 10))

	if (hashErr) {
		const { message } = hashErr

		throw new HttpException(500, message, hashErr)
	}

	const createUserReq = new UserModel({ name, email, password: hash }).save()

	const [createUserErr, createUserRes] = await asyncWrapper(createUserReq)

	if (createUserErr) {
		const { message } = createUserErr

		throw new HttpException(500, message, createUserErr)
	}

	return createUserRes
}
