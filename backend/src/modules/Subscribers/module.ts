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
  providers: [
    ...Object.values(Listeners), 
    ...Object.values(Services),
  ]
})
export class SubscribersModule {}