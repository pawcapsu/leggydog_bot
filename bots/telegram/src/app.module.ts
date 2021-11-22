import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Modules from 'src/modules';
import ClientProxyImport from './global/ClientProxy.import';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // Importing modules
    ...Object.values(Modules),
  ],
})
export class AppModule {}
