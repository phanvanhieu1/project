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

export default class CreateServiceDto {
  @ApiProperty({ type: ObjectId, required: true })
  @IsNotEmpty()
  @IsMongoId({
    each: true,
  })
  readonly idPitch!: ObjectId;

 @ApiProperty({ type: Date, required: true })
    @IsNotEmpty()
    readonly timeStart!: Date;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    readonly totalTime!: string;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    readonly note: string;
}
