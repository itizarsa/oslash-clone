import { Document, Schema, model } from "mongoose"

export interface Shortcut extends Document {
	shortlink: string
	url: string
	description: string
	tags: string
	userId: string
}

const ShortcutSchema = new Schema<Shortcut>(
	{
		shortlink: { type: String, required: true },
		url: { type: String, required: true },
		userId: { type: String, required: true },
		description: String,
		tags: String
	},
	{ timestamps: true }
)

const ShortcutModel = model<Shortcut>("Shortcut", ShortcutSchema)

export default ShortcutModel
