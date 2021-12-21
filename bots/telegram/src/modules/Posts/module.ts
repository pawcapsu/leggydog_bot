import { Module } from '@nestjs/common';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { LanguagesModule } from 'src/modules/Languages/module';
import { ChannelModule } from 'src/modules/Channel/module';
import { ErrorHanlderModule } from 'src/modules/ErrorHandler/module';

import * as Controllers from './listeners';
import * as Services from './services';

@Module({
  imports: [BotInstanceModule, LanguagesModule, ChannelModule, ErrorHanlderModule],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class PostsModule {}