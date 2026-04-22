import { resolve } from 'path';

import type { INestApplication } from '@nestjs/common';
import * as express from 'express';

export function staticServe(app: INestApplication) {
  app.use('/uploads', express.static(resolve('./uploads')));
}
