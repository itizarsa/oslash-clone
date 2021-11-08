import { Document, Schema, model } from "mongoose"

export interface Token extends Document {
	token: string
	userId: string
}

const TokenSchema = new Schema<Token>(
	{
		token: { type: String, required: true },
		userId: { type: String, required: true }
	},
	{ timestamps: true }
)

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 })

const TokenModel = model<Token>("Token", TokenSchema)

export default TokenModel
