import { Module } from '@nestjs/common';

import * as Services from './services';
import * as Controllers from './controllers';
import { BotInstanceService } from './services';

@Module({
  providers: [...Object.values(Services), ...Object.values(Controllers)],
  exports: [BotInstanceService],
})
export class BotInstanceModule {}