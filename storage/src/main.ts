import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './Application.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// Bootstrap function
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApplicationModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        prefix: 'broker_',
      },
    },
  );
  await app.listen();
};

// Bootstrapping our application
bootstrap();
