import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CourseDto } from './course-dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get('bootcamps/:bootId/courses')
  getCoursesByBootcamp(@Param('bootId') bootId: string) {
    return bootId;
  }

  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this.courseService.getCourse(id);
  }

  @Get()
  getCourses() {
    return this.courseService.getCourses();
  }

  @Post()
  createCourse(@Body() body: CourseDto) {
    return this.courseService.createCourse(body);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, body: CourseDto) {
    return this.courseService.updateCourse(id, body);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
