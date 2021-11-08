/**
 * Data Model Interfaces
 */

import HttpException from "../common/http-exception"
import UserModel, { User } from "./user.model"
import { asyncWrapper } from "../common/util"
import { FindUserQuery } from "./user.interface"

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
