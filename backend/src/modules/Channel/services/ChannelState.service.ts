import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChannelStateDocument, ChannelState, ELanguageType } from 'src/types';
import { Model } from 'mongoose';

@Injectable()
export class ChannelStateService {
  constructor(
    @InjectModel('ChannelState')
    private readonly channelStateModel: Model<ChannelStateDocument>,
  ) {}
  
  // fetchOne
  public async fetchOne(identifier: string): Promise<ChannelStateDocument | null> {
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

  // public updateLanguage
  public async updateLanguage(identifier: string, language: string): Promise<ChannelStateDocument | null> {
    const channel = await this.fetchOne(identifier);

    // Updating language property
    channel.language = language as ELanguageType;
    return await channel.updateOne(channel);
  };
};