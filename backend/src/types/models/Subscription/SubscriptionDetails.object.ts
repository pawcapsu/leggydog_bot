import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ESubscriptionSourceType } from '@notifier/types';

// Interface for E621 SubscriptionDetails
export interface ESixSubscriptionDetails {
  type: ESubscriptionSourceType.E621,
  tags: string[],
};

// Interface for SubscriptionDetails
export interface BasicSubscriptionDetails {
  type: ESubscriptionSourceType
};

@Schema()
export class SubscriptionDetails {
  // Source Type
  // - Type of source.
  // E621, E926, etc.
  @Prop({ type: String, enum: Object.values(ESubscriptionSourceType), required: true })
  type: ESubscriptionSourceType;

  // Watch Tags
  // - Only for E621 and E926
  @Prop({ type: [String], required: false })
  tags?: string[];
};

export const SubscriptionDetailsSchema = SchemaFactory.createForClass(SubscriptionDetails);