import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { Category } from './entity/category.entity';
import { Course } from './entity/course.entity';
import { Tag } from './entity/tag.entity';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Category, Tag]), AssetsModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
