import { Injectable } from '@nestjs/common';

import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
  async createCourse(courseData: CreateCourseDto) {
    return this.courseRepository.createCourse(courseData);
  }
}
