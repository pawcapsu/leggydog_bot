import { Module } from '@nestjs/common';
import { LanguagesModule } from 'src/modules/Languages/module';
import { ChannelModule } from 'src/modules/Channel/module';
import { ErrorHanlderModule } from 'src/modules/ErrorHandler/module';

import * as Services from './services';
import * as Controllers from './controllers';
import { BotInstanceService } from './services';

@Module({
  imports: [LanguagesModule, ChannelModule, ErrorHanlderModule],
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [BotInstanceService],
})
export class BotInstanceModule {}