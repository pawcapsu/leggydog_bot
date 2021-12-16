import { Injectable } from '@nestjs/common';
import { InlineKeyboard } from 'grammy';
import { _escapeCharacters } from 'src/helpers';
import { LanguagesConfigService } from 'src/modules/Languages/services';
import { SubscriberService } from 'src/modules/Subscribers/services';
import { EParseMode } from 'src/types';

@Injectable()
export class SubscribersMenuService {
  constructor(
    private readonly service: SubscriberService,
    private readonly languageService: LanguagesConfigService,
  ) {}
  
  // public messageBuilder
  public async messageBuilder(chat_id: string) {
    const language = await this.languageService.getByChannel(chat_id);

    return {
      text: _escapeCharacters(language.get('subscribers.menu')),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          // Subscriber Menu
          .text(language.get('subscribers.button.createNew'), "createSubscriber")
          .text(language.get('subscribers.button.list'), "subscriberMenu-subscribersKeyboard")
          // .text("How to use this?")
          
          .row()
          // Back button
          .text(language.get('common.buttons.openMainMenu'), "openStartMenu")
      }
    };
  };
};