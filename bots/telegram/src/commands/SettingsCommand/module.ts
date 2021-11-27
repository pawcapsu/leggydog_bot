import { Module } from '@nestjs/common';
import { LanguagesModule } from 'src/modules/Languages/module';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { LanguageCommandModule } from 'src/commands/LanguageCommand/module';

import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [BotInstanceModule, LanguagesModule, LanguageCommandModule],
  providers: [...Object.values(Controllers), ...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class SettingsCommandModule {};