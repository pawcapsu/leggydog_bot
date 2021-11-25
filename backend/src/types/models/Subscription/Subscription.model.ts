import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubscriptionConsumer, SubscriptionConsumerSchema } from './SubscriptionConsumer.object';
import { BasicSubscriptionDetails, SubscriptionDetailsSchema } from './SubscriptionDetails.object';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  // - Consumer Information
  // Where do need to send NewPost
  // notifications
  @Prop({ type: SubscriptionConsumerSchema, required: true })
  consumer: SubscriptionConsumer;

  // - Subscription Details
  // Tags and other settings, by
  // which we'll scrap new posts
  @Prop({ type: SubscriptionDetailsSchema, required: true })
  details: BasicSubscriptionDetails;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
