import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/schemas/course.schema';
import { CourseDto } from './course-dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  getCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  getCoursesByBootcamp(bootId: string) {}

  getCourse(id: string): Promise<Course> {
    return this.courseModel
      .findById(id)
      .populate({
        path: 'bootcamp',
        select: 'name description',
      })
      .exec();
  }

  createCourse(body: CourseDto): Promise<Course> {
    const course = new this.courseModel(body);
    return course.save();
  }

  updateCourse(id: string, body: CourseDto): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  deleteCourse(id: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}
