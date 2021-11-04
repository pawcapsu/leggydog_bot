import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BotService } from 'src/services';

@Injectable()
export class StartupEvent implements OnApplicationBootstrap {
  constructor(private readonly botService: BotService) {}

  async onApplicationBootstrap() {
    // Starting our bot
    this.botService.start();
  }
}
