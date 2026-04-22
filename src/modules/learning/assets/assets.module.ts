import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetsController } from './assets.controller';
import { AssetsRepository } from './assets.repository';
import { AssetsService } from './assets.service';
import { Asset } from './entity/assets.entity';
import { StorageModule } from '../../../infra/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), StorageModule],
  controllers: [AssetsController],
  providers: [AssetsService, AssetsRepository],
  exports: [AssetsService, AssetsRepository],
})
export class AssetsModule {}
