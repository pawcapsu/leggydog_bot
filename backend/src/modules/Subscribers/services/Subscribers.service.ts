import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriptionDocument } from 'src/types';
import { Model } from 'mongoose';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel('subscription')
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  // +todo change name
  // public fetchById
  public async fetch(identifier: string) {
    const subscribers = await this.subscriptionModel.find({ "consumer.identifier": identifier }).exec();
    return subscribers ?? [];
  };
};