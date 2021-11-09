/**
 * Data Model Interfaces
 */

import { SearchShortcutDto } from "./search-shortcut.dto"
import ShortcutModel, { Shortcut } from "./shortcut.model"
import HttpException from "../common/http-exception"
import { asyncWrapper } from "../common/util"

/**
 * Service Methods
 */

export const findAll = (userId: string): Promise<Shortcut[]> => {
	return ShortcutModel.find({ userId }).exec()
}

export const search = (body: SearchShortcutDto, userId: string) => {
	const { shortlink = "", description = "", tags = "" } = body

	const query = {
		$or: [
			{ shortlink: { $regex: shortlink, $options: "i" } },
			{ description: { $regex: description, $options: "i" } },
			{ tags: { $regex: tags, $options: "i" } }
		],
		userId
	}

	return ShortcutModel.find(query).exec()
}

export const create = (shortcut: Shortcut, userId: string): Promise<Shortcut> => {
	return new ShortcutModel({ ...shortcut, userId }).save()
}

export const remove = async (id: string, userId: string): Promise<string> => {
	const [err, res] = await asyncWrapper(
		ShortcutModel.findOneAndDelete({ _id: id, userId }).exec()
	)

	if (err) {
		const { message } = err

		throw new HttpException(500, message, err)
	}

	if (!res) throw new HttpException(404, "Shortcut Not Found")

	return ""
}
