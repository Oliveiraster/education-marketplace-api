import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AssetsService } from './assets.service';
import { UploadAssetCommand } from './dto/upload-asset-command.dto';
import { UploadAssetsDto } from './dto/upload-assets.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserType } from '../../../auth/enum/userType.enum';
import { JwtPayload } from '../../../auth/interfaces/jwt-payload.interface';

@Roles(UserType.INSTRUCTOR)
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('upload/:courseId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAsset(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UploadAssetsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const command: UploadAssetCommand = {
      courseId,
      userId: user.sub,
      ...dto,
      file,
    };

    return await this.assetsService.uploadAsset(command);
  }
}
