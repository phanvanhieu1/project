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
import { StatusEmployeeEnum } from 'src/util/enum/statusEmployee.enum';

export default class CreateEmployeeDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(StatusEmployeeEnum)
  readonly status?: StatusEmployeeEnum;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly phone?: string;  

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly address?: string; 

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  readonly email?: string; 

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  readonly note?: string;
}
