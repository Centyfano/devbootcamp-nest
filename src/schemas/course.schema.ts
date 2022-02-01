import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Bootcamp } from './bootcamp.schema';
import { User } from './user.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: [true, 'Please add a description'],
  })
  description: string;

  @Prop({
    type: String,
    required: [true, 'Please add number of weeks'],
  })
  weeks: string;

  @Prop({
    type: Number,
    required: [true, 'Please add a tuition cost'],
  })
  tuition: number;

  @Prop({
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  })
  minimumSkill: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  scholarshipAvailable: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Bootcamp',
    required: true,
  })
  bootcamp: Bootcamp;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
