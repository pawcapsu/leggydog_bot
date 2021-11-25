import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SimpleCacheModule } from 'src/modules/SimpleCache/module';

import * as Services from './services';

@Module({
  imports: [
    SimpleCacheModule,

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
    ])
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class ChannelModule {};