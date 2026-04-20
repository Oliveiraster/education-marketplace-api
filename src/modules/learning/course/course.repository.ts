import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entity/course.entity';

export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    return this.courseRepository.save(courseData);
  }
}
