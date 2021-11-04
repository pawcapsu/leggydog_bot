import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotifierModule } from './notifier.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(NotifierModule);

  // Connecting RabbitMQ microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://user:pass@127.0.0.1:5672`],
      queue: 'DATA_REQUESTS',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices()
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
