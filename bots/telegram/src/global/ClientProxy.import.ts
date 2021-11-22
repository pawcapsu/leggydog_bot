import { ClientsModule, Transport } from "@nestjs/microservices";

export default {
  register() {
    return ClientsModule.register([
      {
        name: 'DATA_REQUESTS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD
        },
      },
    ]);
  }
};