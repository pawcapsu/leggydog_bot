import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ESubscriptionSourceType, Subscription, ESixSubscriptionDetails, SubscriptionDocument, Error, CreateSubscriptionInput, ErrorType } from 'src/types';
import { Model } from 'mongoose';

@Injectable()
export class SingleSubscriberService {
  constructor(
    @InjectModel('subscription')
    private readonly subscriptionModel: Model<SubscriptionDocument>
  ) {}

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