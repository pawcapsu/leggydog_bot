import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ExternalDatabaseModule } from 'src/modules/ExternalDatabase/module';

// Injectables as controllers
import * as Controllers from './controllers';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    ExternalDatabaseModule,
  ],
  providers: [...Object.values(Controllers)]
})
export class CronModule {};