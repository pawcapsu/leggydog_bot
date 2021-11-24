import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelStateSchema } from 'src/types';

import * as Listeners from './listeners';
import * as Services from './services';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'ChannelState',
          schema: ChannelStateSchema,
        },
      ],
    ),
  ],
  controllers: [...Object.values(Listeners)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class ChannelModule {};