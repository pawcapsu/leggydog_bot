import { EConsumerType } from '@app/services';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscirbersService } from '@notifier/services';

@Controller()
export class SubscribersListener {
  constructor(
    private readonly subscribersService: SubscirbersService
  ) {}

  // subscribers::fetch
  @MessagePattern('subscribers::fetch')
  public async fetchSubscribers(
    @Payload() data: { consumer: EConsumerType, chat_id: number }
  ) {
    console.log("trying to return data for payload:");
    console.log(data);

    const subscriberData = await this.subscribersService.fetch(data.chat_id);
    console.log(subscriberData);
    return { data: subscriberData };
  };

  // subscribers::add

  // subscribers::remove
};