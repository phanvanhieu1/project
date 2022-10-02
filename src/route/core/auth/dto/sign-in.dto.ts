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
import EmailValidation from 'src/util/validation/email.validation'
import UsernameValidation from 'src/util/validation/username.validation'

export default class SignInDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @ValidateIf((o) => o.email !== undefined && o.email !== null && o.email !== '')
  @IsString()
  @Validate(EmailValidation)
  @MinLength(3)
  @MaxLength(128)
  readonly email?: string

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string = ''
}
