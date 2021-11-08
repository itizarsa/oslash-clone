/**
 * Data Model Interfaces
 */

import { SearchShortcutDto } from "./search-shortcut.dto"
import ShortcutModel, { Shortcut } from "./shortcut.model"

/**
 * Service Methods
 */

export const findAll = (): Promise<Shortcut[]> => {
	return ShortcutModel.find({}).exec()
}

export const search = (body: SearchShortcutDto) => {
	const { shortlink = "", description = "", tags = "" } = body

	const query = {
		$or: [
			{ shortlink: { $regex: shortlink, $options: "i" } },
			{ description: { $regex: description, $options: "i" } },
			{ tags: { $regex: tags, $options: "i" } }
		]
	}

	return ShortcutModel.find(query).exec()
}

export const create = (shortcut: Shortcut): Promise<Shortcut> => {
	return new ShortcutModel(shortcut).save()
}
