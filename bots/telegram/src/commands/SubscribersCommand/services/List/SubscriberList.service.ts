import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { SubscriberService } from 'src/modules/Subscribers/services';
import { EParseMode, Error } from 'src/types';
import { ErrorType } from 'src/types/enums/Errors';

@Injectable()
export class SubscriberListService {
  constructor(
    private readonly service: SubscriberService,
    private readonly languageService: LanguagesConfigService,
  ) {}
  
  // public messageBuilder
  public async messageBuilder(chat_id: string, subscriber_id?: string) {
    const subscribers: Array<any> = await this.service.fetchMany(chat_id);

    if (!subscriber_id) {
      const subscriber = subscribers[0];

      // Determining options
      const options = this._determineOptions(subscriber, subscribers);
      return await this._buildMessage(subscriber, options, chat_id);
    } else {
      // Fetching current subscriber and determining message options
      // (do it have next or previous pages or no)
      const subscriber = subscribers.find((x) => String(x._id) == String(subscriber_id));
      // +todo error type
      if (!subscriber) throw new Error(ErrorType.UNKNOWN, `Subscription with id ${subscriber_id} not found`);

      const options = this._determineOptions(subscriber, subscribers);
      return await this._buildMessage(subscriber, options, chat_id);
    };

  };

  // private _buildMessage
  private async _buildMessage(subscriber: any, options: 
    // +todo do something with this
    { 
      previousSubscriber: null | string,
      nextSubscriber: null | string,

      currentSubscriber: number,
      subscribersLength: number
    }, 
    chat_id: string,
  ) {
    const language = await this.languageService.getByChannel(chat_id);
    const keyboard = new InlineKeyboard()

    // Edit/Delete/Stop Subscriber
    if (subscriber) {
      keyboard
        .text(language.get('common.buttons.delete'), `deleteSubscriber-${ subscriber._id }`)
        .text(language.get('common.buttons.back'), "openSubscriberMenu")
        .row()
    } else {
      keyboard.text(language.get('common.buttons.back'), "openSubscriberMenu");
    };

    // Checking for previos subscriber
    if (options.previousSubscriber) {
      keyboard.text(language.get('subscribers.list.previous'), `previousSubsciberInfo-${ options.previousSubscriber }`)
    };

    // Checking for next subscriber
    if (options.nextSubscriber) {
      keyboard.text(language.get('subscribers.list.next'), `nextSubsciberInfo-${ options.nextSubscriber }`);
    } else {
      keyboard.text(language.get('subscribers.button.createNew'), "createSubscriber")
    };

    if (subscriber) {
      return {
        text: _escapeCharacters(language.get('subscribers.list.information', 
        {
          currentSubscriber: options.currentSubscriber,
          subscribersLength: options.subscribersLength,
          currentSubscriberId: subscriber._id,
          tags: subscriber.details.tags
        })),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: keyboard,
        },
      }
    } else {
      return {
        text: _escapeCharacters(language.get('subscribers.list.emptySubscribers')),
        options: {
          parse_mode: EParseMode.MARKDOWNV2,
          reply_markup: keyboard,
        },
      }
    };
  };

  // +todo add types
  // private _determineOptions
  public _determineOptions(current: any, subscribers: any[]) {
    const previousSubsciber = subscribers.filter((x, index) => index == subscribers.indexOf(current) - 1);
    const nextSubsciber = subscribers.filter((x, index) => index == subscribers.indexOf(current) + 1);

    return {
      previousSubscriber: previousSubsciber[0] != null ? String(previousSubsciber[0]._id) : null,
      nextSubscriber: nextSubsciber[0] != null ? String(nextSubsciber[0]._id) : null,

      currentSubscriber: subscribers.indexOf(current) + 1,
      subscribersLength: subscribers.length,
    };
  };
};