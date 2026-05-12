import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AboutUpdateDto } from './dto/updates/about-update.dto';
import { PersonalUpdateDto } from './dto/updates/personal-update.dto';
import { StorageService } from '../../../infra/storage/storage.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  async getProfile(id: number) {
    return this.userService.getMyProfile(id);
  }

  async updateAbout(id: number, dto: AboutUpdateDto) {
    return this.userService.updateAbout(id, dto);
  }
  async updatePersonal(id: number, dto: PersonalUpdateDto) {
    return this.userService.updatePersonal(id, dto);
  }

  async updatePhoto(id: number, photo: Express.Multer.File) {
    const extension = photo.mimetype.split('/')[1];
    const photoUrl = await this.storageService.uploadPhoto(id, extension, photo);
    return this.userService.updatePhoto(id, photoUrl);
  }
}
