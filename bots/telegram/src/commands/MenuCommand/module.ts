import { Module } from '@nestjs/common';
import { SubscribersModule } from 'src/modules/Subscribers/module';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { ErrorHanlderModule } from 'src/modules/ErrorHandler/module';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [SubscribersModule, BotInstanceModule, ErrorHanlderModule],
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [...Object.values(Services)],
})
export class MenuCommandModule {}