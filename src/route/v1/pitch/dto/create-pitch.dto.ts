import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { StatusEnum } from 'src/util/enum/status.enum';

export default class CreatePitchDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  readonly type?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(StatusEnum)
  readonly status?: StatusEnum;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly price?: string;

  @ApiProperty({ type: ObjectId, required: false })
  @IsOptional()
  @IsMongoId({
    each: true,
  })
  readonly assign!: ObjectId;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly note?: string;
}
