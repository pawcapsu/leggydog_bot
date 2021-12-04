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
      // Finding subscriptions with these tags
      const subscriptions = await this.subscriptionModel.find({ "details.tags": { $in: post.tags } });

      subscriptions.forEach((subscription) => {
        console.log('send');
        this.sendPostService.send(subscription, post);
      });
    };
  };
};