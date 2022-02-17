import { Injectable } from '@nestjs/common';
import { SubscriberService } from 'src/modules/Subscribers/services';
import { EParseMode } from 'src/types';
import { _escapeCharacters } from 'src/helpers';
import { InlineKeyboard } from 'grammy';
import { LanguagesConfigService } from 'src/modules/Languages/services';

@Injectable()
export class MenuCommandService {
  constructor(
    private readonly subscribersService: SubscriberService,
    private readonly languageService: LanguagesConfigService,
  ) {}

  // public messageBuilder
  public async messageBuilder(chat_id: string) {
    const subscribers = [];
    if (chat_id) {
      const response = await this.subscribersService.fetchMany(chat_id);

      subscribers.push(...response);
    };
    
    const language = await this.languageService.getByChannel(chat_id);

    // Random quotes
    // +todo move somewhere
    const quotes: string[] = [];

    if (language.name == 'Russian') {
      const quotesLength = 1;
      for (let i = 1; i <= quotesLength; i++) {
        console.log(i);
        quotes.push(language.get(`dashboard.quote.${i}`));
      }
    } else {
      const quotesLength = 1;
      for (let i = 0; i <= quotesLength; i++) {
        quotes.push(language.get(`dashboard.quote.${i}`));
      }
    };
    
    return {
      text: _escapeCharacters(subscribers.length > 0 ? language.get('dashboard', { subscribers, quote: quotes[Math.floor(Math.random() * quotes.length)] }) : language.get('dashboard.introduction')),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          // Menus buttons
          .text(language.get('dashboard.buttons.subscribers'), "openSubscriberMenu")
          .text(language.get('dashboard.buttons.settings'), "openSettingsMenu")
          .text(language.get('common.buttons.close'), "delete-me")
          .row()
          // Information buttons
          .url(language.get('dashboard.buttons.otherServices'), "https://www.odzi.dog")
      },
    };
  };
};