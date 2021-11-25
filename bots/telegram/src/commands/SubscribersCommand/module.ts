import { Module } from '@nestjs/common';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { SubscribersModule } from 'src/modules/Subscribers/module'
import { MenuCommandModule } from 'src/commands/MenuCommand/module';
import { ChannelModule } from 'src/modules/Channel/module';
import { SimpleCacheModule } from 'src/modules/SimpleCache/module';
import { LanguagesModule } from 'src/modules/Languages/module';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [BotInstanceModule, SubscribersModule, MenuCommandModule, ChannelModule, SimpleCacheModule, LanguagesModule],
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [...Object.values(Services)],
})
export class SubscribersCommandModule {}