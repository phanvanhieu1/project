import { MinLength, MaxLength, IsString, IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export default class SignOutDto {
  @ApiPropertyOptional({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  readonly fcmToken?: string
}
