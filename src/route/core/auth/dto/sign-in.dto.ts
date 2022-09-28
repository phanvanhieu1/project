import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator'
import UsernameValidation from 'src/util/validation/username.validation'

export default class SignInDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @ValidateIf((o) => o.username !== undefined && o.username !== null && o.username !== '')
  @IsString()
  @Validate(UsernameValidation)
  @MinLength(3)
  @MaxLength(128)
  readonly username?: string

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string = ''
}
