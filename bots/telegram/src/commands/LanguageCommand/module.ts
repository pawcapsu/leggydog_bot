import { Module } from '@nestjs/common';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { LanguagesModule } from 'src/modules/Languages/module';
import { ChannelModule } from 'src/modules/Channel/module';
import { ErrorHanlderModule } from 'src/modules/ErrorHandler/module';

import * as Services from './services';
import * as Controllers from './controllers';

@Module({
  imports: [BotInstanceModule, LanguagesModule, ChannelModule, ErrorHanlderModule],
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [...Object.values(Services)],
})
export class LanguageCommandModule {}