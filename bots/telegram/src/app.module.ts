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
          urls: [`amqp://user:pass@127.0.0.1:5672`],
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
