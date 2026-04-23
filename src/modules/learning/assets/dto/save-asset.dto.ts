import { UploadAssetsDto } from './upload-assets.dto';

export class saveAssetDto extends UploadAssetsDto {
  type!: string;
  url?: string;
  couser!: number;
}
