import type { UserType } from '../enum/userType';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserType;
}
