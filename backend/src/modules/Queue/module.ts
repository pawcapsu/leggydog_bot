import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import * as Processors from 'src/modules/Queue/processors';
import { ScrapperQueueName } from '@notifier/types';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ScrapperQueueName,
    }),
  ],
  providers: [...Object.values(Processors)],
})
export class QueueModule {}