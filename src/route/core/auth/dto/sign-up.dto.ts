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
    @ValidateIf((o) => o.username !== undefined && o.username !== null && o.username !== '')
    @IsString()
    @Validate(UsernameValidation)
    @MinLength(3)
    @MaxLength(128)
    readonly username?: string
  
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @ValidateIf((o) => o.email !== undefined && o.email !== null && o.email !== '')
    @IsString()
    @Validate(EmailValidation)
    @MinLength(3)
    @MaxLength(128)
    readonly email?: string
  
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @ValidateIf((o) => o.phone !== undefined && o.phone !== null && o.phone !== '')
    @IsNumberString()
    @Validate(PhoneValidation)
    @MinLength(8)
    @MaxLength(20)
    readonly phone?: string
  
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @ValidateIf((o) => o.fullName !== undefined && o.fullName !== null && o.fullName !== '')
    @IsString()
    @MinLength(0)
    @MaxLength(256)
    readonly fullName?: string
  
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(64)
    readonly password: string = ''
  }
  