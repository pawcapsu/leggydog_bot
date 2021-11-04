import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:pass@localhost:5672'],
        queue: 'myqueue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}

bootstrap();
