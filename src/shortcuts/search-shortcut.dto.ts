import { IsOptional, IsString } from "class-validator"
import { Expose } from "class-transformer"

export class SearchShortcutDto {
	@IsOptional()
	@IsString()
	@Expose()
	shortlink?: string

	@IsOptional()
	@IsString()
	@Expose()
	description?: string

	@IsOptional()
	@IsString()
	@Expose()
	tags?: string
}
