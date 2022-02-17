import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from 'src/modules/Logs/module';

import * as Services from './services';

@Module({
  imports: [
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

    LogsModule,
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class SubscribersModule {}