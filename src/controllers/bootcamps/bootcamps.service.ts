import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bootcamp, BootcampDocument } from 'src/schemas/bootcamp.schema';
import * as geocoder from 'src/utils/geocoder';
import { BootcampDto } from './bootcamp-dto';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel(Bootcamp.name) private bootModel: Model<BootcampDocument>,
  ) {}

  getBootcamps(): Promise<Bootcamp[]> {
    return this.bootModel.find().exec();
  }

  async getBootcampsInRadius(
    zipcode: string | number,
    distance: number,
  ): Promise<Bootcamp[]> {
    const loc = await geocoder.geocoder.geocode(zipcode),
      lat = loc[0].latitude,
      lng = loc[0].longitude,
      /**
       * @description calculate radius using radians
       *
       *
       * Divide the distance by the radius of the earth
       *
       *
       * _Earth's radius = 3963 mi / 6378 km_
       */
      radius = distance / 3963;

    const boot = this.bootModel.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    return boot.exec();
  }

  getBootcamp(id: string): Promise<Bootcamp> {
    return this.bootModel.findById(id).exec();
  }

  /**
   * Create a new bootcamp
   * @param body The body of the request, submitted via a form
   * @access Private
   * @returns Promise
   */
  createBootcamp(body: BootcampDto): Promise<Bootcamp> {
    const boot = new this.bootModel(body);
    return boot.save();
  }

  updateBootcamp(id: string, body: BootcampDto): Promise<Bootcamp> {
    return this.bootModel.findByIdAndUpdate(id, body, { new: true }).exec();
  }

  uploadBootcampPhoto(id: string, photo: Express.Multer.File) {
    const boot = this.bootModel.findById(id);

    console.dir(boot);
    // HttpCode
    if (!boot) return { status: HttpCode(404) };
    return { id, photo };
  }

  deleteBootcamp(id: string) {
    return this.bootModel.findByIdAndDelete(id).exec();
  }
}
