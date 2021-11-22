import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotifierModule } from './notifier.module';

async function bootstrap() {
  const app = await NestFactory.create(NotifierModule);

  // Connecting broker microservice
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      prefix: 'broker_',
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
