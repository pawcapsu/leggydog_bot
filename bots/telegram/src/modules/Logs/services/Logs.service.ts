import { Injectable } from '@nestjs/common';
import { BotInstanceService } from 'src/modules/BotInstance/services';

@Injectable()
export class LogsService {
  constructor(
    private readonly instance: BotInstanceService,
  ) {}

  // public log
  // +todo I don't know
  public async log(message?: string) {
    // Checking if channel @leggydog_logs exists
    try {
      await this.instance.bot.api.getChat("@juiipup");
    } catch(error) {
      console.log('error');
      console.log(error);
      return;
    };

    // Sending this message to this channel
    // this.instance.bot.api.send
    this.instance.bot.api.sendMessage("@juiipup", message);
  };
};