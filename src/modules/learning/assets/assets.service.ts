import { BadRequestException, Injectable } from '@nestjs/common';

import { AssetsRepository } from './assets.repository';
import { saveAssetDto } from './dto/save-asset.dto';
import { UploadAssetCommand } from './dto/upload-asset-command.dto';
import { StorageService } from '../../../infra/storage/storage.service';

@Injectable()
export class AssetsService {
  constructor(
    private readonly assetsRepository: AssetsRepository,
    private readonly storage: StorageService,
  ) {}

  async uploadAsset(command: UploadAssetCommand) {
    const extension = command.file.originalname.split('.').pop();
    if (!extension) {
      throw new BadRequestException('File must have an extension');
    }

    const result = await this.storage.upload(command.courseId, extension, command.file);

    const saveData: saveAssetDto = {
      type: extension,
      url: result,
      title: command.title,
      couser: command.courseId,
    };

    return await this.assetsRepository.saveAsset(saveData);
  }
}
