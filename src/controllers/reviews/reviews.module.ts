import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review } from './entities/review.entity';
import { ReviewSchema } from 'src/schemas/review.schema';
import { NextFunction } from 'express';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Review.name,
        useFactory: () => {
          const schema = ReviewSchema;
          schema.pre<Review>('save', function (next: NextFunction) {
            const rev = this;
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
