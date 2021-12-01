import { Module } from '@nestjs/common';

import * as E621Services from './services/E621';

@Module({
  providers: [...Object.values(E621Services)],
  exports: [...Object.values(E621Services)],
})
export class ExternalDatabaseModule {};