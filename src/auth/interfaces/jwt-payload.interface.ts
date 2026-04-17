import type { UserType } from '../enum/userType.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  roles: UserType[];
}
