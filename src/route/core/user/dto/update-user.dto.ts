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

export default class updatePassWordDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly oldPassWord?: string

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly newPassWord: string = ''
}
