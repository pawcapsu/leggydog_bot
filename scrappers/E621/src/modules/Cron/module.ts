import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapperModule } from 'src/modules/Scrapper/module';

import * as Services from './services';

@Module({
  imports: [
    ScrapperModule,

    ScheduleModule.forRoot(),
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class CronModule {}