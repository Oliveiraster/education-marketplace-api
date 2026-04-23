import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { azureConfig } from './azure.config';

@Injectable()
export class AzureStorageCourseService {
  private readonly azureConfig: ReturnType<typeof azureConfig>;
  private readonly containerClient: ContainerClient;

  constructor(private readonly configService: ConfigService) {
    this.azureConfig = azureConfig(this.configService);

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.azureConfig.connectionString,
    );
    this.containerClient = blobServiceClient.getContainerClient(this.azureConfig.containerCourse);
  }

  async UploadPdf(courseId: number, file: Express.Multer.File, extension: string): Promise<string> {
    const blobPath = `course-${courseId}/${extension}/${file.originalname}`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobPath);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return blockBlobClient.url;
  }
}
