import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

enum Point {
  'Point',
}
interface Location {
  type: Point;
  coordinates: number[];
  formattedAddress: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}
enum Career {
  'Web Development',
  'Mobile Development',
  'UI/UX',
  'Data Science',
  'Business',
  'Other',
}
export class BootcampDto {
  @IsString()
  @IsNotEmpty({ message: 'Please add a name' })
  @MaxLength(50, { message: 'Name cannot be more than 50 characters' })
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsNotEmpty({ message: 'Please add a desctiption' })
  @MaxLength(500, {
    message: 'Description can not be more than 500 characters',
  })
  description: string;

  @IsOptional()
  @IsUrl({ message: 'Please use a valid URL with HTTP or HTTPS' })
  website: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'Phone number cannot be longer than 20 characters',
  })
  phone: string;

  @IsOptional()
  @IsEmail({ message: 'Please add a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Please add an address' })
  @IsString()
  address: string;

  @IsOptional()
  @IsObject()
  location: Location;

  @IsNotEmpty()
  @IsEnum(Career, { each: true })
  careers: Career;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating must be at most 10' })
  averagerRating: number;

  @IsOptional()
  @IsNumber()
  averageCost: number;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsBoolean()
  housing: boolean;

  @IsOptional()
  @IsBoolean()
  jobAssistance: boolean;

  @IsOptional()
  @IsBoolean()
  jobGuarantee: boolean;

  @IsOptional()
  @IsBoolean()
  acceptGi: boolean;

  @IsOptional()
  @IsString()
  user: string;
}
