import { IsArray, IsOptional, IsString, MaxLength, ArrayMaxSize } from 'class-validator';

export class AboutUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(400)
  bio?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(60)
  role?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  objective?: string;
}
