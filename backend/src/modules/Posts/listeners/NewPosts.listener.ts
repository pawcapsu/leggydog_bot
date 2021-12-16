import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriptionDocument } from 'src/types';
import { SendPostService } from 'src/modules/Posts/services';
import { Model } from 'mongoose';
import { IPost } from 'types';

@Controller()
export class NewPostsListener {
  constructor(
    @InjectModel('subscription')
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  
    private readonly sendPostService: SendPostService,
  ) {}

  @EventPattern('backend::processNewPosts')
  public async processNewPosts(
    @Payload() posts: Array<IPost>
  ) {    
    for (const post of posts) {
      const sentTo: string[] = [];

      // Finding subscriptions with these tags
      const subscriptions = await this.subscriptionModel.find({ "details.tags": { $in: post.tags } });

      subscriptions.forEach((subscription) => {
        if (!sentTo.includes(subscription.consumer.identifier)) {
          // Sending
          this.sendPostService.send(subscription, post);
          sentTo.push(subscription.consumer.identifier);
        };
      });
    };
  };
};