import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { SubscriberService } from 'src/modules/Subscribers/services';
import { EParseMode } from 'src/types';

@Injectable()
export class SubscribersMenuService {
  constructor(
    private readonly service: SubscriberService,
  ) {}
  
  // public messageBuilder
  public async messageBuilder() {
    return {
      text: _escapeCharacters("*Subscriber menu*"),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          // Subscriber Menu
          .text("Subscribe to tags", "createSubscriber")
          .text("Edit/Delete Subscribes", "subscriberMenu-subscribersKeyboard")
          .text("How to use this?")
          
          .row()
          // Back button
          .text("⬅️ To main menu", "openStartMenu")
      }
    };
  };
};