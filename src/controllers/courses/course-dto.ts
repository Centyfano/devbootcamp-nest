import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
enum Skills {
  'beginner',
  'intermediate',
  'advanced',
}

export class CourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Please add a course title' })
  title: string;

  @IsNotEmpty({ message: 'Please add a description' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Please add number of weeks' })
  weeks: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Please add tutition cost' })
  tuition: number;

  @IsNotEmpty({ message: 'Please add a minimum skill' })
  @IsEnum(Skills, { each: true })
  minimumSkill: Skills;

  @IsOptional()
  @IsBoolean()
  scholarshipsAvailable: boolean;
}
