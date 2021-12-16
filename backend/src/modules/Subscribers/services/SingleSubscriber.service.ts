import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ESubscriptionSourceType, Subscription, ESixSubscriptionDetails, SubscriptionDocument, Error, CreateSubscriptionInput, ErrorType } from 'src/types';
import { Model, Types } from 'mongoose';

@Injectable()
export class SingleSubscriberService {
  constructor(
    @InjectModel('subscription')
    private readonly subscriptionModel: Model<SubscriptionDocument>
  ) {}

  // public deleteSubscriber
  public async deleteSubscriber(subscriber: string): Promise<boolean> {
    // Trying to delete this subscriber
    const result = await this.subscriptionModel.deleteOne({ _id: new Types.ObjectId(subscriber) });
    
    return result.deletedCount == 0 ? false : true;
  };

  // public createSubscriber
  public async createSubscriber(input: CreateSubscriptionInput): Promise<SubscriptionDocument | Error> {
    // Creating subscription for E621
    if (input.source.type == ESubscriptionSourceType.E621) {
      // Checking data consistency

      // +todo error handling
      if (!input.source.tags || !input.source.tags.length) 
        return new Error(ErrorType.INVALID_PAYLOAD, "Tags property isn't set.");

      // Constructing subscription data
      const data: Subscription & { details: ESixSubscriptionDetails } = {
        consumer: {
          type: input.consumer.type,
          identifier: input.consumer.identifier,
        },
        details: {
          type: ESubscriptionSourceType.E621,
          tags: input.source.tags,
        },
      };
      
      // Creating this subscription
      const subscription = new this.subscriptionModel(data);

      return await subscription.save();
    };
  };
};