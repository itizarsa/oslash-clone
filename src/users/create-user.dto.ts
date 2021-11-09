import { IsDefined, IsEmail, IsString } from "class-validator"
import { Expose } from "class-transformer"

export class CreateUserDto {
	@IsDefined()
	@IsString()
	@Expose()
	name: string

	@IsDefined()
	@IsEmail()
	@Expose()
	email: string

	@IsDefined()
	@IsString()
	@Expose()
	password: string
}
