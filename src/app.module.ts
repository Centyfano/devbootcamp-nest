import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { BootcampsModule } from './controllers/bootcamps/bootcamps.module';
import { CoursesModule } from './controllers/courses/courses.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { ReviewsModule } from './controllers/reviews/reviews.module';
import { AdvancedResultsMiddleware } from './middleware/advanced-results.middleware';
import { Model } from 'mongoose';
import { Bootcamp } from './schemas/bootcamp.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './controllers/users/users.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    BootcampsModule,
    CoursesModule,
    ReviewsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor },
  ],
})
export class AppModule {
  // implements NestModule
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AdvancedResultsMiddleware) //(Model<Bootcamp>, 'courses')
  //     .exclude(
  //       { path: 'bootcamps', method: RequestMethod.GET },
  //       'bootcamps/(.*)',
  //     )
  //     .forRoutes({ path: 'bootcamps', method: RequestMethod.GET });
  // }
}
