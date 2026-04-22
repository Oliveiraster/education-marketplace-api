import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { authConfig } from './config/auth.config';
import { staticServe } from './config/serve-static.config';
import { setupSwagger } from './config/swagger.config';
import { validationConfig } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  authConfig(app);
  validationConfig(app);
  staticServe(app);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 5000);
}

void bootstrap().catch((err) => {
  console.error('Erro ao iniciar app:', err);
});
