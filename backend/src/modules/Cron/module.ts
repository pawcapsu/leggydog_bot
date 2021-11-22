import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ScrapperQueueName } from '@notifier/types';

import * as Services from 'src/modules/Cron/services';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATA_REQUESTS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD
        },
      },
    ]),
    BullModule.registerQueue({
      name: ScrapperQueueName,
    }),
  ],
  providers: [...Object.values(Services)]
})
export class CronModule {}