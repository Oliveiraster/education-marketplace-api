import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { createJwtConfig } from '../config/create-jwt-config';
import { JwtConfigType } from '../interfaces/jwt-config.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfigType;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = createJwtConfig(this.configService);
  }

  generateAuthToken(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtConfig.auth.secret,
        expiresIn: this.jwtConfig.auth.expiresIn,
      }),
    };
  }

  verifyAuthToken(token: string) {
    return this.verify(token, this.jwtConfig.auth.secret);
  }

  private verify(token: string, secret: string) {
    return this.jwtService.verify(token, { secret });
  }
}
