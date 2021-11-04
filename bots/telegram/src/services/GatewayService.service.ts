import { Injectable } from '@nestjs/common';
import { SubscribersService } from 'src/services';

@Injectable()
export class GatewayService {
  constructor(
    private readonly subscribersService: SubscribersService,
  ) {}

  // ----------------------------
  // Subscribers-related commands
  // ----------------------------

  // public fetchSubscribers
  public async fetchSubscribers(chat_id: number) {
    return await this.subscribersService.fetch(chat_id);
  };

  // public addSubscriber

  // public removeSubscriber
};