import { Module } from '@nestjs/common';

import { CourseModule } from './course/course.module';

@Module({
  imports: [CourseModule],
  exports: [CourseModule],
})
export class LearningModule {}
