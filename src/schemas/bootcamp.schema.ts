import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type BootcampDocument = Bootcamp & Document;

@Schema()
export class Bootcamp {
  @Prop({
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  })
  name: string;

  @Prop(String)
  slug: string;

  @Prop({
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  })
  description: string;

  @Prop({
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS',
    ],
  })
  website: string;

  @Prop({
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  })
  phone: string;

  @Prop({
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Please add an address'],
  })
  address: string;

  @Prop(
    raw({
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    }),
  )
  location: Record<string, any>;

  @Prop({
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  })
  careers: string[];

  @Prop({
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10'],
  })
  averageRating: number;

  @Prop(Number)
  averageCost: number;

  @Prop({ type: String, default: 'no-photo.jpg' })
  photo: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  housing: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  jobAssistance: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  jobGuarantee: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  acceptGi: boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BootcampSchema = SchemaFactory.createForClass(Bootcamp);
