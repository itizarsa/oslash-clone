import { IsDefined, IsString, IsUrl } from "class-validator"
import { Expose } from "class-transformer"

export class CreateShortcutDto {
	@IsDefined()
	@IsString()
	@Expose()
	shortlink: string

	@IsDefined()
	@IsUrl()
	@Expose()
	url: string

	@IsDefined()
	@IsString()
	@Expose()
	description: string

	@IsDefined()
	@IsString()
	@Expose()
	tags: string
}
