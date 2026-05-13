import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class PersonalUpdateDto {
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  whatsapp?: string;
}
