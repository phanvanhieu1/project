import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class forgotPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}