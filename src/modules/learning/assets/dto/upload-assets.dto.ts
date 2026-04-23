import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAssetsDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title!: string;
}
