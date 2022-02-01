import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async login(userDetails: LoginUserDto) {
    const { username, password } = userDetails;
    const user = await this.userModel.findOne({ email: username }).exec();

    /**
     * No user found in database
     */
    if (!user) return;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return;
    const payload = { username: user.email, sub: user._id };
    return { token: this.jwt.sign(payload) };
  }
}
