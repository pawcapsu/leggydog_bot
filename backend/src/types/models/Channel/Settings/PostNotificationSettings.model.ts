import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IPostField } from 'types';

@Schema()
export class PostNotificationSettings {
  @Prop({ type: Array, required: true })
  fields: Array<Omit<IPostField, 'value'>>;
};

export const PostNotificationSettingsSchema = SchemaFactory.createForClass(PostNotificationSettings);