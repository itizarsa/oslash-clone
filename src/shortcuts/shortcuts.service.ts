/**
 * Data Model Interfaces
 */

import ShortcutModel, { Shortcut } from "./shortcut.model"

/**
 * Service Methods
 */

export const findAll = (): Promise<Shortcut[]> => {
	return ShortcutModel.find({}).exec()
}

export const create = (shortcut: Shortcut): Promise<Shortcut> => {
	return new ShortcutModel(shortcut).save()
}
