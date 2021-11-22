import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScrapperAgentDocument } from '@notifier/types';
import { Model } from 'mongoose';

@Injectable()
export class SubscirbersService {
  constructor(
    @InjectModel('agent')
    private readonly subscriberModel: Model<ScrapperAgentDocument>,
  ) {}

  // public fetch
  public async fetch(chat_id: number) {
    const subscribers = await this.subscriberModel.find({ "consumer.chatId": String(chat_id) }).exec();
    return subscribers;
  };

};