import { IsOptional, IsString } from 'class-validator';

export class UploadAssetsDto {
  @IsOptional()
  @IsString()
  title!: string;
}
