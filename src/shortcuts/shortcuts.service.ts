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
