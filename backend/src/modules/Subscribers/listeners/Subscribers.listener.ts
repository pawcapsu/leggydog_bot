
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ESubscriptionConsumerType } from 'src/types';
import { SubscribersService } from 'src/modules/Subscribers/services';

@Controller()
export class SubscribersListener {
  constructor(
    private readonly subscribersService: SubscribersService,
  ) {}

  // subscribers::fetch
  @MessagePattern('subscribers::fetch')
  public async fetchSubscribers(
    @Payload() data: { type: ESubscriptionConsumerType, identifier: string }
  ) {
    console.log('trying to fetch subscribers');
    return await this.subscribersService.fetch(data.identifier);
  };

  // subscribers::add

  // subscribers::remove
};