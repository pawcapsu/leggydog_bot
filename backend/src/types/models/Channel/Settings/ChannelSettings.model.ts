import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { PostNotificationSettings, PostNotificationSettingsSchema } from '.';

@Schema()
export class ChannelSettings {
  @Prop({ type: PostNotificationSettingsSchema, required: true })
  notifications: PostNotificationSettings
};

export const ChannelSettingsSchema = SchemaFactory.createForClass(ChannelSettings);