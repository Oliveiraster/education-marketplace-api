import type { JwtSignOptions } from '@nestjs/jwt';

export type JwtConfigType = {
  auth: {
    secret: string;
    expiresIn: JwtSignOptions['expiresIn'];
  };
  reset: {
    secret: string;
    expiresIn: JwtSignOptions['expiresIn'];
  };
  confirmEmail: {
    secret: string;
    expiresIn: JwtSignOptions['expiresIn'];
  };
};
