import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import * as Services from './services';
import * as Listeners from './listeners';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATA_REQUESTS',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'DATA_REQUESTS',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [...Object.values(Listeners)],
  providers: [...Object.values(Services)],
})
export class AppModule {}
