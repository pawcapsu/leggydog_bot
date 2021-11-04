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
      urls: [process.env.RABBITMQ_URL],
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
