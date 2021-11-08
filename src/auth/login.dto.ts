import { IsDefined, IsEmail, IsString } from "class-validator"
import { Expose } from "class-transformer"

export class LoginDto {
	@IsDefined()
	@IsEmail()
	@Expose()
	email: string

	@IsDefined()
	@IsString()
	@Expose()
	password: string
}
