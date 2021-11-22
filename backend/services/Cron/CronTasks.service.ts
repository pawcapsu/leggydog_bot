import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueueService } from '@notifier/modules/Queue/services';

@Injectable()
export class CronTasksService {
  constructor(
    private queueService: QueueService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async handleCron() {
    console.log('Cron');
    await this.queueService.add({ foo: 'bar' });
  };
};