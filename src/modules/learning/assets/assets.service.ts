import { BadRequestException, Injectable } from '@nestjs/common';

import { AssetsRepository } from './assets.repository';
import { saveAssetDto } from './dto/save-asset.dto';
import { UploadAssetCommand } from './dto/upload-asset-command.dto';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async uploadAsset(command: UploadAssetCommand) {
    const extension = command.file.originalname.split('.').pop();
    if (!extension) {
      throw new BadRequestException('File must have an extension');
    }

    const saveData: saveAssetDto = {
      type: extension,
      url: `https://fakeurl.com/${command.file.filename}`,
      title: command.title,
      couser: command.courseId,
    };

    await this.assetsRepository.saveAsset(saveData);

    return { message: 'Asset uploaded successfully' };
  }
}
