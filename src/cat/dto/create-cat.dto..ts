import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(10)
  name: string;

  @ApiProperty({ required: true })
  @IsInt()
  @Max(30)
  @Min(1)
  age: number;

  @ApiProperty({ required: true })
  @IsInt()
  userId: number;
}
