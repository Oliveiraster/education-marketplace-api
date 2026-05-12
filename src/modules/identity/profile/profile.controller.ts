import { Body, Controller, Get, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AboutUpdateDto } from './dto/updates/about-update.dto';
import { PersonalUpdateDto } from './dto/updates/personal-update.dto';
import { ProfileService } from './profile.service';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserType } from '../../../auth/enum/userType.enum';
import { JwtPayload } from '../../../auth/interfaces/jwt-payload.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  @Roles(UserType.USER)
  async getProfile(@CurrentUser() { sub }: JwtPayload) {
    return this.profileService.getProfile(sub);
  }

  @Put('about')
  @Roles(UserType.USER)
  async updateAbout(@CurrentUser() { sub }: JwtPayload, @Body() dto: AboutUpdateDto) {
    return this.profileService.updateAbout(sub, dto);
  }

  @Put('personal')
  @Roles(UserType.USER)
  async updatePersonal(@CurrentUser() { sub }: JwtPayload, @Body() dto: PersonalUpdateDto) {
    return this.profileService.updatePersonal(sub, dto);
  }

  @Put('avatar')
  @Roles(UserType.USER)
  @UseInterceptors(FileInterceptor('photo'))
  async updatePhoto(
    @CurrentUser() { sub }: JwtPayload,

    @UploadedFile()
    photo: Express.Multer.File,
  ) {
    return this.profileService.updatePhoto(sub, photo);
  }
}
