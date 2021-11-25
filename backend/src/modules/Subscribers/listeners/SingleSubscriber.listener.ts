import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BasicSubscriptionInput, CreateSubscriptionInput, ESubscriptionConsumerType, Error, ESubscriptionSourceType, SubscriptionDocument } from 'src/types';
import { SingleSubscriberService } from 'src/modules/Subscribers/services';

@Controller()
export class SingleSubscriberListener {
  constructor(
    private readonly subscriberService: SingleSubscriberService,
  ) {}

  // subscriber::create
  @MessagePattern('subscriber::create')
  public async createSubscriber(
    @Payload() data: any
  ): Promise<SubscriptionDocument | Error> {
    // Checking if data object is a CreateSubscriptionInput object
    // data = { consumer: { type: 'TELEGRAM', identifier: '12312' }, source: { type: 'E621' } };
    if (this._subscriptionInputGuard(data)) {
      // Checking source type
      if (data.source.type == ESubscriptionSourceType.E621) {
        // Creating new subscriber
        const subscriber = await this.subscriberService.createSubscriber({
          consumer: {
            type: data.consumer.type,
            identifier: data.consumer.identifier,
          },
          source: {
            type: ESubscriptionSourceType.E621,

            // ESix-related
            tags: data.source.tags,
          }
        });

        return subscriber;
      };
    };
  };

  // private _subscriptionInputGuard
  private _subscriptionInputGuard(object: any): object is CreateSubscriptionInput {
    // 
    const CheckableProperties: BasicSubscriptionInput = {
      consumer: {
        type: ESubscriptionConsumerType.TELEGRAM,
        identifier: '000000',
      },

      source: {
        type: ESubscriptionSourceType.E621,
      },
    };

    function checkProperty(original: object, check: object): boolean {
      for (const [name, value] of Object.entries(original)) {
        if (typeof value == 'object') {
          if (!check[name]) return false;
          if (!checkProperty(value, check[name])) {
            return false
          };
        } else {
          if (!check[name]) return false;
        };
      };

      return true
    };

    // Return
    return checkProperty(CheckableProperties, object);
  };
};
