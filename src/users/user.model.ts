import { Document, Schema, model } from "mongoose"

export interface User extends Document {
	name: string
	email: string
	password: string
}

const UserSchema = new Schema<User>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true }
	},
	{ timestamps: true }
)

const UserModel = model<User>("User", UserSchema)

export default UserModel
