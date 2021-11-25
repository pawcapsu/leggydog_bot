import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelStateDocument, ChannelActionDocument, ELanguageType, UpdateChannelInput } from 'src/types';
import { Model } from 'mongoose';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel('ChannelState')
    private readonly channelStateModel: Model<ChannelStateDocument>,
  ) {}
  
  // fetchOne
  public async fetchOne(identifier: string): Promise<ChannelStateDocument> {
    let channel = await this.channelStateModel.findOne({ identifier });
    if (!channel) {
      // Creating new ChannelState
      channel = await (new this.channelStateModel({
        identifier,
        language: ELanguageType.EN,
      })).save();
    };

    return channel;
  };

  // public update
  public async update(identifier: string, data: UpdateChannelInput): Promise<ChannelStateDocument> {
    const channel = await this.fetchOne(identifier);

    // Updating language property
    if (data.language) {
      channel.language = data.language;
    };

    // Updating action
    // +todo proper action updating
    if (data.action) {
      channel.action = data.action;
    };
    
    await channel.updateOne(channel);

    return channel;
  };

  // public activate
  public async activate(identifier: string): Promise<ChannelStateDocument> {
    const channel = await this.fetchOne(identifier);

    // Updating activate property
    channel.active = true;
    await channel.updateOne(channel);
    
    return channel;
  };

  // public deactivate
  public async deactivate(identifier: string): Promise<ChannelStateDocument> {
    const channel = await this.fetchOne(identifier);

    // Updating activate property
    channel.active = false;
    await channel.updateOne(channel);

    return channel;
  };
};