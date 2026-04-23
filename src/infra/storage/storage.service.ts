import { Injectable } from '@nestjs/common';

import { LocalService } from './local/local.service';

@Injectable()
export class StorageService {
  constructor(private readonly localService: LocalService) {}

  async upload(courseId: number, extension: string, file: Express.Multer.File) {
    return this.localService.uploadToCourse(courseId, extension, file);
  }
}
