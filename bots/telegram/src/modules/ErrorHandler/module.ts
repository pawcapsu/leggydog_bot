import { Module } from '@nestjs/common';
import { LanguagesModule } from 'src/modules/Languages/module';

import * as Services from './services';

@Module({
  imports: [LanguagesModule],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class ErrorHanlderModule {}