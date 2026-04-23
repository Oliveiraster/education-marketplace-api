import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Asset } from './entity/assets.entity';

@Injectable()
export class AssetsRepository {
  constructor(
    @InjectRepository(Asset)
    private readonly repository: Repository<Asset>,
  ) {}

  async saveAsset(assetData: Partial<Asset>): Promise<Asset> {
    return this.repository.save(assetData);
  }
}
