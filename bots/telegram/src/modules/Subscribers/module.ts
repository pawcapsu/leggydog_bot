import { Module } from '@nestjs/common';
import ClientProxyImport from 'src/global/ClientProxy.import';
import { ClientsModule, Transport } from "@nestjs/microservices";

import * as Services from './services';

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
    ])
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class SubscribersModule {}