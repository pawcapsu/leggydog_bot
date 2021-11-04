import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { ChannelStateSchema, EQueueNames } from '@notifier/types';
import { ScrapperAgentSchema } from '@notifier/types';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribeProcessors } from './services/Sources';
import { ConfigModule } from '@nestjs/config';

import * as Services from './services';
import * as Listeners from './listeners';

import { ApiService as E621ApiService } from './services/Sources/E621';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATA_REQUESTS',
        transport: Transport.RMQ,
        options: {
          // process.env.RABBITMQ_URL
          urls: [`amqps://uircczlp:n1s7mJN3jF4ANtIgYTkfXjju8XtnmnNt@rat.rmq2.cloudamqp.com/uircczlp`],
          queue: 'DATA_REQUESTS',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),

    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'service/notifier',
    }),
    MongooseModule.forFeature(
      [
        {
          name: 'agent',
          schema: ScrapperAgentSchema,
        },
        {
          name: 'channelState',
          schema: ChannelStateSchema,
        },
      ],
      'service/notifier',
    ),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
    BullModule.registerQueue({
      name: EQueueNames.E621,
      processors: [new SubscribeProcessors[0]().initialize()],
    }),
  ],
  controllers: [...Object.values(Listeners)],
  providers: [
    // BotServices
    ...Object.values(Services),

    // ApiServices
    E621ApiService,
  ],
})
export class NotifierModule {}
