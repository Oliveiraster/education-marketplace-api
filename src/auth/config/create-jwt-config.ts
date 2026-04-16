import type { ConfigService } from '@nestjs/config';
import type { JwtSignOptions } from '@nestjs/jwt';

import type { JwtConfigType } from '../interfaces/jwt-config.interface';

export const createJwtConfig = (configService: ConfigService): JwtConfigType => {
  const authSecret = configService.get<string>('JWT_AUTH_SECRET');
  const authExpires = configService.get<string>('JWT_EXPIRATION_TIME');

  if (!authSecret || !authExpires) {
    throw new Error('JWT_AUTH_SECRET ou JWT_EXPIRATION_TIME não definidos');
  }

  const resetSecret = configService.get<string>('JWT_RESET_SECRET');
  const resetExpires = configService.get<string>('JWT_EXPIRATION_RESET_PASSWORD');

  if (!resetSecret || !resetExpires) {
    throw new Error('JWT_RESET_SECRET ou JWT_EXPIRATION_RESET_PASSWORD não definidos');
  }

  const confirmEmailSecret = configService.get<string>('JWT_CONFIRM_EMAIL_SECRET');
  const confirmEmailExpires = configService.get<string>('JWT_EXPIRATION_CONFIRM_EMAIL');

  if (!confirmEmailSecret || !confirmEmailExpires) {
    throw new Error('JWT_CONFIRM_EMAIL_SECRET ou JWT_EXPIRATION_CONFIRM_EMAIL não definidos');
  }
  return {
    auth: {
      secret: authSecret,
      expiresIn: authExpires as JwtSignOptions['expiresIn'],
    },
    reset: {
      secret: resetSecret,
      expiresIn: resetExpires as JwtSignOptions['expiresIn'],
    },
    confirmEmail: {
      secret: confirmEmailSecret,
      expiresIn: confirmEmailExpires as JwtSignOptions['expiresIn'],
    },
  };
};
