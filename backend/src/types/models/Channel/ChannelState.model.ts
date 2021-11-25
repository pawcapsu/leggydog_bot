import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ChannelAction } from '.';
import { ChannelActionSchema, ELanguageType } from 'src/types';

export type ChannelStateDocument = Document & ChannelState;

@Schema()
export class ChannelState {
  @Prop({ type: String, required: true })
  identifier: number | string;

  @Prop({ type: Boolean, required: false, default: false })
  active?: boolean;

  // +todo
  // proper mongoose prop type (ChannelActionSchema)
  @Prop({ type: Object, required: false })
  action?: ChannelAction;

  @Prop({ type: String, enum: Object.values(ELanguageType), required: true, default: ELanguageType.EN })
  language: ELanguageType;
}

export const ChannelStateSchema = SchemaFactory.createForClass(ChannelState);
