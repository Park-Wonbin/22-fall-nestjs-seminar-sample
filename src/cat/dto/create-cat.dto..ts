import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MaxLength(10)
  name: string;

  @IsInt()
  @Max(30)
  @Min(1)
  age: number;

  @IsInt()
  userId: number;
}
