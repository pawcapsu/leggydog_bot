import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChannelModule } from 'src/modules/Channel/module';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [
    ChannelModule,

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
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [...Object.values(Services)],
})
export class LanguagesModule {}