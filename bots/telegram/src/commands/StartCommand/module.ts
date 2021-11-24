import { Module } from '@nestjs/common';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { MenuCommandModule } from 'src/commands/MenuCommand/module';
import { LanguageCommandModule } from 'src/commands/LanguageCommand/module';

import * as Controllers from './controllers';

@Module({
  imports: [BotInstanceModule, MenuCommandModule, LanguageCommandModule],
  providers: [...Object.values(Controllers)],
})
export class StartModule {}