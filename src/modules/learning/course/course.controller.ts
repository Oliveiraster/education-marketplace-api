import { Body, Controller, Post } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserType } from '../../../auth/enum/userType.enum';

Roles(UserType.TEACHER);
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }
}
