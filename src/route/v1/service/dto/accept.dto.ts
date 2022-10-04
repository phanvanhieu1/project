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

export default class AcceptDto {
  @ApiProperty({ type: ObjectId, required: true })
  @IsNotEmpty()
  @IsMongoId({
    each: true,
  })
  readonly idOrder!: ObjectId;
}
