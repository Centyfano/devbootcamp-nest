import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {}

export const ReviewSchema = SchemaFactory.createForClass(Review);
