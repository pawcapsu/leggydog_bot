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
    
    return {
      text: _escapeCharacters(subscribers.length > 0 ? language.get('dashboard', { subscribers }) : language.get('dashboard.introduction')),
      options: {
        parse_mode: EParseMode.MARKDOWNV2,
        reply_markup: new InlineKeyboard()
          // Menus buttons
          .text(language.get('dashboard.buttons.subscribers'), "openSubscriberMenu")
          .text(language.get('dashboard.buttons.settings'), "openSettingsMenu")
          .text(language.get('common.buttons.close'), "delete-me")
          .row()
          // Information buttons
          .url(language.get('dashboard.buttons.learnMore'), "https://services.pawcapsu.ml/leggybot")
          .url(language.get('dashboard.buttons.otherServices'), "https://services.pawcapsu.ml")
      },
    };
  };
};