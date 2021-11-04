import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { EQueueNames } from '@notifier/types';
import {
  IE621ScrapperData,
  IScrapperAgent,
  EMessageActionType,
} from '@app/services';
import { QueueHandlerService } from '.';
import { Queue } from 'bull';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CronTasksService {
  constructor(
    @InjectQueue(EQueueNames.E621)
    private scrapperQueue: Queue,

    private readonly agentsService: QueueHandlerService,

    @Inject('DATA_REQUESTS')
    private messageBroker: ClientProxy,
  ) {}

  private readonly logger = new Logger(CronTasksService.name);

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async testCron() {
  //   console.log('TEST CRON EVERY SECOND');
  //   type TestType = {
  //     test: string;
  //   };

  //   const value = await firstValueFrom(
  //     this.testQueue.send<TestType>({ cmd: 'sum' }, 'data'),
  //   );
  //   console.log('VALUE:');
  //   console.log(value);
  // }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    for await (const doc of this.agentsService.getCursor()) {
      const jobId = `scrape-${doc.consumer.chatId}-${doc.data.tags.join('_')}`;

      const job = await this.scrapperQueue.getJob(jobId);
      if (!job || (job && job.isCompleted)) {
        await this.scrapperQueue
          .add(<IScrapperAgent<IE621ScrapperData>>doc, {
            removeOnComplete: true,
            removeOnFail: true,
            jobId,
          })
          .then(() => {
            this.agentsService.handleQueue(jobId, EMessageActionType.NEW_POST);
          });
      }
    }
  }
}
