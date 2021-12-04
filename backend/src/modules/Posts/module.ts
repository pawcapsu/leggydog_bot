import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from 'src/types';
import { ChannelModule } from 'src/modules/Channel/module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import * as Controllers from './listeners';
import * as Services from './services';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'subscription',
          schema: SubscriptionSchema,
        },
      ],
    ),

    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'DATA_REQUESTS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          prefix: 'broker_',
        },
      },
    ]),

    ChannelModule,
  ],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)]
})
export class PostsModule {}