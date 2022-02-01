import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum Role {
  'user',
  'publisher',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Please add a name' })
  name: string;

  @IsEmail({ message: 'Please add a valid email' })
  @IsNotEmpty({ message: 'Please add an email' })
  email: string;

  @IsEnum(Role, { each: true })
  role: Role;

  @IsNotEmpty({ message: 'Please add a password' })
  @MinLength(6, { message: 'Password should be 6 or more characters long' })
  password: string;
}
