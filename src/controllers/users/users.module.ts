import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const user = UserSchema;
          user.pre<User>('save', async function (next: NextFunction) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
          });

          // user.methods.getSignedJwtToken = function () {
          //   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          //     expiresIn: process.env.JWT_EXPIRE,
          //   });
          // };
          return user;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
