import { Module } from '@nestjs/common';
import { BotInstanceModule } from 'src/modules/BotInstance/module';

import * as Controllers from './controllers';

@Module({
  imports: [BotInstanceModule],
  providers: [...Object.values(Controllers)]
})
export class DeleteMeCommandModule {}