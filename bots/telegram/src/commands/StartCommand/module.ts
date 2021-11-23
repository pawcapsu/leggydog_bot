import { Module } from '@nestjs/common';
import { BotInstanceModule } from 'src/modules/BotInstance/module';
import { MenuCommandModule } from 'src/commands/MenuCommand/module';

import * as Controllers from './controllers';

@Module({
  imports: [BotInstanceModule, MenuCommandModule],
  providers: [...Object.values(Controllers)],
})
export class StartModule {}