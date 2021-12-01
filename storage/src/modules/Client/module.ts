import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import * as Services from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // ClientProxy
    ClientsModule.register([
      {
        // +todo
        // use client name from /types folder
        name: 'MESSAGES',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          prefix: 'broker_',
        },  
      }
    ])
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)]
})
export class ClientModule {}