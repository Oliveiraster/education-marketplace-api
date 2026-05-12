import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalService {
  constructor(private readonly configService: ConfigService) {}

  async uploadToCourse(
    courseId: number,
    extension: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const baseUrl = this.configService.get<string>('BASE_URL');
    const dir = path.resolve(process.cwd(), 'uploads', 'courses', courseId.toString(), extension);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const sanitizedName = this.sanitizeFilename(file.originalname);
    const filePath = path.join(dir, sanitizedName);

    fs.writeFileSync(filePath, file.buffer);

    return `${baseUrl}/uploads/courses/${courseId}/${extension}/${sanitizedName}`;
  }

  async uploadPhoto(userId: number, extension: string, file: Express.Multer.File): Promise<string> {
    const baseUrl = this.configService.get<string>('BASE_URL');

    const dir = path.resolve(process.cwd(), 'uploads', 'users', userId.toString(), extension);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const sanitizedName = this.sanitizeFilename(file.originalname);

    const filePath = path.join(dir, sanitizedName);

    fs.writeFileSync(filePath, file.buffer);

    return `${baseUrl}/uploads/users/${userId}/${extension}/${sanitizedName}`;
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w.-]/g, '');
  }
}
