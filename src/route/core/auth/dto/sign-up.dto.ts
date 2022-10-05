import {
    MinLength,
    MaxLength,
    IsString,
    IsEmail,
    IsOptional,
    ValidateIf,
    IsNotEmpty,
    IsNumberString,
    Validate,
  } from 'class-validator'
  import { ApiProperty } from '@nestjs/swagger'
import UsernameValidation from 'src/util/validation/username.validation'
import EmailValidation from 'src/util/validation/email.validation'
import PhoneValidation from 'src/util/validation/phone.validation'
 
  
  export default class SignUpDto {
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    readonly username?: string
  
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    readonly email?: string
  
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsNumberString()
    readonly phone?: string
  
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsString()
    readonly fullName?: string
  
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    readonly password: string = ''
  }
  