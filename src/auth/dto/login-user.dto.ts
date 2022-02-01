import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Please provide a username' })
  username: string;

  @IsString()
  @Exclude()
  @IsNotEmpty({ message: 'Please provide a password' })
  password: string;
}
