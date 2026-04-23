import { Module } from '@nestjs/common';

import { LocalService } from './local/local.service';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService, LocalService],
  exports: [StorageService],
})
export class StorageModule {}
