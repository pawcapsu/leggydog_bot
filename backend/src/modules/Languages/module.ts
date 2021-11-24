import { Module } from '@nestjs/common';

import * as Listeners from './listeners';

@Module({
  controllers: [...Object.values(Listeners)],
})
export class LanguagesModule {}