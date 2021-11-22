import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'redis-15852.c294.ap-northeast-1-2.ec2.cloud.redislabs.com',
        port: 15852,
        password: 'BWbSdXtHe16D0H9heq7wtPeApcogzw4Z'
      },
    },
  );
  await app.listen();
}

bootstrap();
