import { Module } from '@nestjs/common';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { StorageModule } from '../../../infra/storage/storage.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, StorageModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
