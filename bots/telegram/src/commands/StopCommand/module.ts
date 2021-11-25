import { Module } from '@nestjs/common';
import { ChannelModule } from 'src/modules/Channel/module';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { LanguagesModule } from 'src/modules/Languages/module';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [BotInstanceModule, LanguagesModule, ChannelModule],
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [...Object.values(Services)],
})
export class StopCommandModule {}