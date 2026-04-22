import type { ConfigService } from '@nestjs/config';

export const azureConfig = (configService: ConfigService) => {
  const connectionString = configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
  const containerUser = configService.get<string>('AZURE_STORAGE_CONTAINER_USER');
  const containerCourse = configService.get<string>('AZURE_STORAGE_CONTAINER_COURSE');

  if (!connectionString || !containerUser || !containerCourse) {
    throw new Error('Azure Storage configuration is incomplete');
  }

  return {
    connectionString,
    containerUser,
    containerCourse,
  };
};
