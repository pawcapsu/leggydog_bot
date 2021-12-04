import { Module } from '@nestjs/common';
import { StorageModule } from 'src/modules/Storage/module';
import { E621Module } from 'src/modules/E621/module';
import { BackendModule } from 'src/modules/Backend/module';

import * as Services from './services';

@Module({
  imports: [StorageModule, E621Module, BackendModule],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class ScrapperModule {}
