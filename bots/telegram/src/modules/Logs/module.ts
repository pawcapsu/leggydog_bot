import { Module, forwardRef } from '@nestjs/common';
import { BotInstanceModule } from '..';

// Importing services and listeners
import * as Services from './services';
// import * as Listeners from './listeners';

@Module({
  imports: [BotInstanceModule],
  // controllers: [...Object.values(Listeners)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class LogsModule {};