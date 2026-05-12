import type { AboutDto } from '../../../user/dto/about.dto';

export class ProfileResponseDto {
  name!: string;
  email!: string;
  phone!: string | null;
  whatsapp!: string | null;
  photo!: string | null;
  status!: string;
  about!: AboutDto | null;
}
