import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EChannelActionType } from 'src/types';

export type ChannelActionDocument = ChannelAction & Document;

@Schema()
export class ChannelAction {
  @Prop({ type: String, enum: Object.keys(EChannelActionType), required: true })
  type: EChannelActionType;

  @Prop({ type: Object, required: false })
  data?: any;
}

export const ChannelActionSchema = SchemaFactory.createForClass(ChannelAction);