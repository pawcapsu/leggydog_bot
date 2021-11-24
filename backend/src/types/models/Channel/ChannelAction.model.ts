import { Schema, Prop } from '@nestjs/mongoose';
import { EChannelActionType } from 'src/types';

@Schema()
export class ChannelAction {
  @Prop({ type: String, enum: Object.keys(EChannelActionType), required: true })
  type: EChannelActionType;

  @Prop({ type: Object, required: false })
  data?: any;
}
