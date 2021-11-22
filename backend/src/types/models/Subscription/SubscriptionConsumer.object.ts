import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ESubscriptionConsumerType } from 'src/types';

@Schema()
export class SubscriptionConsumer {
  // - Subscription Consumer type
  // Telegram, Discord, etc.
  @Prop({ type: String, enum: Object.values(ESubscriptionConsumerType), required: true })
  type: ESubscriptionConsumerType;

  // - Identifier
  // for telegram: chat_id,
  // for discord: id of channel,
  @Prop({ type: String, required: true })
  identifier: string;
};

export const SubscriptionConsumerSchema = SchemaFactory.createForClass(SubscriptionConsumer);