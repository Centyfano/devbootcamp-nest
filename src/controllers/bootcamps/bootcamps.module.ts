import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Bootcamp, BootcampSchema } from 'src/schemas/bootcamp.schema';

import * as geocoder from 'src/utils/geocoder';
import { BootcampsController } from './bootcamps.controller';
import { BootcampsService } from './bootcamps.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Bootcamp.name,
        useFactory: () => {
          const schema = BootcampSchema;
          schema.pre<Bootcamp>('save', async function (next: NextFunction) {
            const boot = this;
            const loc = await geocoder.geocoder.geocode(
              JSON.stringify(boot.address),
            );
            boot.location = {
              tyspe: 'Point',
              coordinates: [loc[0].longitude, loc[0].latitude],
              formattedAddress: loc[0].formattedAddress,
              street: loc[0].streetName,
              city: loc[0].city,
              state: loc[0].stateCode,
              zipcode: loc[0].zipcode,
              country: loc[0].countryCode,
            };
            boot.address = undefined;
            next();
          });
          schema.pre('remove', async function (next: NextFunction) {
            // const
          });
          schema.virtual('courses', {
            ref: 'Course',
            localField: '_id',
            foreignField: 'bootcamp',
            justOne: false,
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [BootcampsController],
  providers: [BootcampsService],
})
export class BootcampsModule {}
