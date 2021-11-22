import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScrapperQueueName } from '@notifier/types';
import { Queue } from 'bull';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CronTasksService {
  client: ClientProxy
  constructor(
    // @InjectQueue(ScrapperQueueName)
    // private queue: Queue,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'redis-15852.c294.ap-northeast-1-2.ec2.cloud.redislabs.com',
        port: 15852,
        password: 'BWbSdXtHe16D0H9heq7wtPeApcogzw4Z'
      },
    });
  }

  @Cron(CronExpression.EVERY_SECOND)
  async handleCron() {
  }
};
