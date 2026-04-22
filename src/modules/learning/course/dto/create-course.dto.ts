import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description!: string;

  @IsOptional({ message: 'Thumbnail is optional' })
  thumbnail?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  price!: number;

  @IsNotEmpty({ message: 'Publish status is required' })
  isPublished?: boolean;
}
