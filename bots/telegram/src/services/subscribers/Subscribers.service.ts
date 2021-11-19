import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SubscribersService {
  constructor(
    @Inject('DATA_REQUESTS')
    private readonly dataRequests: ClientProxy,
  ) {}

  // public fetch
  public async fetch(chat_id: number) {
    console.log("Got response from Backend service:");
    const response = await firstValueFrom(
      this.dataRequests.send('subscribers::fetch', { consumer: 'TELEGRAM', chat_id })
    );
    console.log(response);

    return response;
  };

  // public add

  // public remove
}
