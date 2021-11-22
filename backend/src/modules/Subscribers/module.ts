import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from 'src/types';

import * as Listeners from 'src/modules/Subscribers/listeners';
import * as Services from 'src/modules/Subscribers/services';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'subscription',
          schema: SubscriptionSchema,
        },
      ],
    ),
  ],
  controllers: [
    ...Object.values(Listeners),
  ],
  providers: [
    ...Object.values(Services),
  ]
})
export class SubscribersModule {}