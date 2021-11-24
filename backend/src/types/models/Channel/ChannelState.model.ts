import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IChannelState } from '@app/services';
import { Document } from 'mongoose';
import { ChannelAction } from '.';
import { ELanguageType } from 'src/types';

export type ChannelStateDocument = Document & ChannelState;

@Schema()
export class ChannelState {
  @Prop({ type: String, required: true })
  identifier: number | string;

  @Prop({ type: Object, required: false })
  action?: ChannelAction;

  @Prop({ type: String, enum: Object.values(ELanguageType), required: true, default: ELanguageType.EN })
  language: ELanguageType;
}

export const ChannelStateSchema = SchemaFactory.createForClass(ChannelState);
