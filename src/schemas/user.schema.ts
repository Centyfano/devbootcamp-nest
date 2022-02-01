import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
export enum Role {
  'user',
  'publisher',
}

@Schema()
export class User {
  @Prop({ type: String, required: [true, 'Please add a name'] })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  })
  email: string;

  @Prop({
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  })
  role: Role;

  @Prop({
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  })
  password: string;

  @Prop(String)
  resetPasswordToken: string;

  @Prop(Date)
  resetPasswordExpire: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
