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
    return { data: await this.subscribersService.fetch(data.chat_id) };
  };

  // subscribers::add

  // subscribers::remove
};