import type { INestApplication } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

export function authConfig(app: INestApplication) {
  app.useGlobalGuards(app.get(JwtAuthGuard), app.get(RolesGuard));
}
