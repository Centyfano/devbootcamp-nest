import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BootcampDto } from './bootcamp-dto';
import { BootcampsService } from './bootcamps.service';

@Controller('bootcamps')
export class BootcampsController {
  constructor(private bootcampService: BootcampsService) {}

  @Get()
  getBootcamps() {
    return this.bootcampService.getBootcamps();
  }

  /**
   *
   * @param id Bootcamp id
   * @returns Promise <Bootcamp>
   */
  @Get(':id')
  getBootcamp(@Param('id') id: string) {
    return this.bootcampService.getBootcamp(id);
  }

  /**
   * Find all bootcamps within a given radius
   * @param params zipcode
   * @returns Promise
   */
  @Get('radius/:zipcode/:distance')
  getBootcampsInRadius(@Param() params: any) {
    const zipcode = params.zipcode,
      distance = params.distance;

    return this.bootcampService.getBootcampsInRadius(zipcode, distance);
  }

  @Post()
  @HttpCode(201)
  createBootcamp(@Body() body: BootcampDto) {
    return this.bootcampService.createBootcamp(body);
  }

  /**
   * Update bootcamp
   * @param id Bootcamp ID
   * @param body Body passed to be updated
   * @returns Promise
   */
  @Put(':id')
  updateBootcamp(@Param('id') id: string, @Body() body: BootcampDto) {
    return this.bootcampService.updateBootcamp(id, body);
  }

  @Put(':id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  uploadBootcampPhoto(
    @Param('id') id: string,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.bootcampService.uploadBootcampPhoto(id, photo);
  }

  @Delete(':id')
  deleteBootcamp(@Param('id') id: string) {
    return this.bootcampService.deleteBootcamp(id);
  }
}
