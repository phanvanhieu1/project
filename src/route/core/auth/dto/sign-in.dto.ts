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
  @IsString()
  readonly email?: string

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly password: string = ''
}
