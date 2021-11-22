import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScrapperQueueName } from '@notifier/types';
import { Queue } from 'bull';

@Injectable()
export class CronTasksService {
  constructor(
    @InjectQueue(ScrapperQueueName)
    private queue: Queue,
  
    @Inject('DATA_REQUESTS')
    private client: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    console.log('CRON');
    this.client.send('test', { test: true });
    // await this.queue.add({ foo: 'bar' });
  }
};
