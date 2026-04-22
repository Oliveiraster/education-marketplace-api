export class UploadAssetCommand {
  courseId!: number;
  userId!: number;
  title!: string;
  description?: string;
  file!: Express.Multer.File;
}
